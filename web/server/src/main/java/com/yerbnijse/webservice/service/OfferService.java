package com.yerbnijse.webservice.service;

import com.yerbnijse.webservice.event.OffersNotificationEvent;
import com.yerbnijse.webservice.event.WarehousePushEvent;
import com.yerbnijse.webservice.model.Duplicate;
import com.yerbnijse.webservice.model.Favourite;
import com.yerbnijse.webservice.model.Offer;
import com.yerbnijse.webservice.model.Portal;
import com.yerbnijse.webservice.model.User;
import com.yerbnijse.webservice.model.dto.FieldValidator;
import com.yerbnijse.webservice.model.dto.Pagination;
import com.yerbnijse.webservice.model.dto.PagingResult;
import com.yerbnijse.webservice.model.dto.input.FavouriteInput;
import com.yerbnijse.webservice.model.dto.input.OfferInput;
import com.yerbnijse.webservice.model.dto.output.OfferDetailsDto;
import com.yerbnijse.webservice.model.dto.output.OfferListDto;
import com.yerbnijse.webservice.model.exception.ControllerValidationException;
import com.yerbnijse.webservice.repository.DuplicateRepository;
import com.yerbnijse.webservice.repository.OfferRepository;
import com.yerbnijse.webservice.repository.PortalRepository;
import com.yerbnijse.webservice.util.enums.PortalEnum;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class OfferService {

	private final OfferRepository offerRepository;
	private final PortalRepository portalRepository;
	private final DuplicateRepository duplicateRepository;
	private final ApplicationEventPublisher eventPublisher;
	private final UserAuthService authService;

	public PagingResult get(String search, PortalEnum portalEnum, Integer amountFrom, Integer amountTo,
			Integer priceFrom, Integer priceTo, Pagination pagination) {
		passToWarehouse(search, portalEnum, amountFrom, amountTo, priceFrom, priceTo);
		Integer portalId = portalEnum == null ? null : portalEnum.getId();
		Page<Offer> offerPage = offerRepository.findBy(search, portalId, amountFrom, amountTo, priceFrom, priceTo,
				pagination.resolve());
		return PagingResult.from(offerPage, OfferListDto.class, Offer.class);
	}

	public void fillWithData(List<OfferInput> input) {
		Portal portal = portalRepository.getOne(input.get(0).getDomain().getId());
		List<Offer> updatedOffers = new ArrayList<>();
		for (OfferInput incoming : input) {
			Optional<Offer> optionalOffer = offerRepository.findByNameAndAmount(incoming.getProductName(),
					incoming.getProductAmount());
			if (optionalOffer.isEmpty()) {
				updatedOffers.add(offerRepository.save(Offer.from(incoming, portal)));
			} else {
				Offer existing = optionalOffer.get();
				if (existing.getPortal().getId().equals(portal.getId())) {
					if (incoming.getProductPrice() < existing.getPrice()) {
						updatedOffers.add(offerRepository.save(existing.setPriceAndReturn(incoming.getProductPrice())));
					} else {
						if (!existing.getDuplicates().isEmpty()) {
							Duplicate duplicateBestPrice = existing.getDuplicates().stream()
									.min(Comparator.comparing(Duplicate::getPrice)).get(); //TODO MAKES A WARN
							if (duplicateBestPrice.getPrice() < incoming.getProductPrice()) {
								existing.setPrice(incoming.getProductPrice());
								Duplicate tmpToSwap = Duplicate.from(existing); // Only copy of values
								offerRepository.save(existing.swap(duplicateBestPrice));
								duplicateRepository.save(duplicateBestPrice.swap(tmpToSwap));
							} else {
								offerRepository.save(existing.setPriceAndReturn(incoming.getProductPrice()));
							}
						}
					}
				} else {
					if (existing.getDuplicates().isEmpty()) {
						if (existing.getPrice() > incoming.getProductPrice()) {
							updatedOffers.add(offerRepository.save(existing.setData(incoming, portal)));
						} else {
							existing.addDuplicate(Duplicate.from(incoming, portal, existing));
							offerRepository.save(existing);
						}
					} else {
						Optional<Duplicate> optionalDuplicate = existing.getDuplicates().stream()
								.filter(duplicate -> duplicate.getPortal().getId().equals(portal.getId())).findFirst();
						if (optionalDuplicate.isPresent()) {
							Duplicate duplicate = optionalDuplicate.get();
							if (existing.getPrice() > incoming.getProductPrice()) {
								Duplicate tmpToSwap = Duplicate.from(existing);
								Offer offerToSwap = existing.swap(duplicate);
								offerToSwap.setPrice(incoming.getProductPrice());
								updatedOffers.add(offerRepository.save(offerToSwap));
								duplicateRepository.save(duplicate.swap(tmpToSwap));
							} else {
								duplicate.setPrice(incoming.getProductPrice());
								duplicateRepository.save(duplicate);
							}
						} else {
							if (existing.getPrice() > incoming.getProductPrice()) {
								existing.setData(incoming, portal);
								updatedOffers.add(offerRepository.save(existing));
							} else {
								Duplicate duplicate = Duplicate.from(incoming, portal, existing);
								duplicateRepository.save(duplicate);
							}
						}
					}
				}
			}
		}
		eventPublisher.publishEvent(new OffersNotificationEvent(this, updatedOffers));
	}

	public void setFavourite(Long offerId, FavouriteInput input) {
		User user = authService.getLoggedUser();
		Offer offer = getById(offerId);
		Optional<Favourite> optionalFavourite = offer.getFavourites().stream()
				.filter(favourite -> favourite.getUser().getId().equals(user.getId())).findFirst();
		if (optionalFavourite.isPresent()) {
			optionalFavourite.get().edit(input);
		} else {
			offer.addFavourite(user, input);
		}
		offerRepository.save(offer);
	}

	public void switchFavourite(Long offerId) {
		User user = authService.getLoggedUser();
		Offer offer = getById(offerId);
		Optional<Favourite> optionalFavourite = offer.getFavourites().stream()
				.filter(favourite -> favourite.getUser().getId().equals(user.getId())).findFirst();
		if (optionalFavourite.isPresent()) {
			optionalFavourite.get().switchFavourite();
		} else {
			offer.newFavourite(user);
		}
		offerRepository.save(offer);
	}

	public OfferDetailsDto getDetails(Long offerId) {
		return OfferDetailsDto.from(getById(offerId));
	}

	private Offer getById(Long id) {
		return 	offerRepository.findById(id)
				.orElseThrow(() -> new ControllerValidationException(new FieldValidator.Builder().errorField("offerId")
						.status(HttpStatus.NOT_FOUND).errorMessage("Nie znaleziono oferty o id: %s", id).build()));
	}

	private void passToWarehouse(String search, PortalEnum portalEnum, Integer amountFrom, Integer amountTo,
			Integer priceFrom, Integer priceTo) {
		StringBuilder builder = new StringBuilder();
		if (search != null && !search.isBlank())
			builder.append("chIn=").append(search).append("&");
		if (portalEnum != null)
			builder.append("portal=").append(portalEnum).append("&");
		if (amountFrom != null)
			builder.append("amountFrom=").append(amountFrom).append("&");
		if (amountTo != null)
			builder.append("amountTo=").append(amountTo).append("&");
		if (priceFrom != null)
			builder.append("priceFrom=").append(priceFrom).append("&");
		if (priceTo != null)
			builder.append("priceTo=").append(priceTo).append("&");
		eventPublisher.publishEvent(new WarehousePushEvent(this, builder.toString()));
	}
}
