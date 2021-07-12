package com.yerbnijse.webservice.service;

import com.yerbnijse.webservice.event.OffersNotificationEvent;
import com.yerbnijse.webservice.event.OnSentEmailEvent;
import com.yerbnijse.webservice.event.WarehousePushEvent;
import com.yerbnijse.webservice.model.Filter;
import com.yerbnijse.webservice.model.Offer;
import com.yerbnijse.webservice.model.Portal;
import com.yerbnijse.webservice.model.User;
import com.yerbnijse.webservice.model.dto.FieldValidator;
import com.yerbnijse.webservice.model.dto.input.FilterInput;
import com.yerbnijse.webservice.model.dto.output.FilterDetailsDto;
import com.yerbnijse.webservice.model.dto.output.FilterListDto;
import com.yerbnijse.webservice.model.dto.output.SimpleFilterDto;
import com.yerbnijse.webservice.model.exception.ControllerValidationException;
import com.yerbnijse.webservice.repository.FilterRepository;
import com.yerbnijse.webservice.repository.OfferRepository;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class FilterService {

	@Value("${app.warehouse.host}")
	private String warehouseUrl;

	private final OfferRepository offerRepository;
	private final FilterRepository filterRepository;
	private final UserAuthService authService;
	private final ApplicationEventPublisher eventPublisher;

	public List<SimpleFilterDto> getFilters() {
		return authService.getLoggedUser().getFilters().stream().map(SimpleFilterDto::from)
				.collect(Collectors.toList());
	}

	public List<SimpleFilterDto> addFilter(FilterInput filterInput) {
		User user = authService.getLoggedUser();
		Optional<Filter> optionalFilter = user.getFilters().stream().filter(filter -> filter.getName().equals(filterInput.getName())).findFirst();
		if (optionalFilter.isEmpty()) {
			filterRepository.save(Filter.from(filterInput, user));
		} else {
			Filter filter = optionalFilter.get();
			filter.edit(filterInput);
			filterRepository.save(filter);
		}
		return user.getFilters().stream().map(SimpleFilterDto::from).collect(Collectors.toList());
	}

	public List<SimpleFilterDto> edit(Long filterId, FilterInput filterInput) {
		Filter filter = filterRepository.findById(filterId)
				.orElseThrow(() -> new ControllerValidationException(new FieldValidator.Builder().errorField("id")
						.status(HttpStatus.NOT_FOUND).errorMessage("Nie istnieje filtr o id ", filterId).build()));
		filter.edit(filterInput);
		filterRepository.save(filter);
		return authService.getLoggedUser().getFilters().stream().map(SimpleFilterDto::from)
				.collect(Collectors.toList());
	}

	@EventListener(OffersNotificationEvent.class)
	public void searchForNotifications(OffersNotificationEvent event) {
		List<Offer> offers = event.getOffers();
		List<Filter> filters = filterRepository.findAll();
		Map<User, List<Filter>> userFilters = filters.stream().collect(Collectors.groupingBy(Filter::getUser));
		Set<User> usersWithFilters = userFilters.keySet();
		for (User user : usersWithFilters) {
			List<Offer> offersToSend = new ArrayList<>();
			List<Offer> offersToFilter = new ArrayList<>(offers);
			for (Filter filter : userFilters.get(user)) {
				offersToSend.addAll(filter(offersToFilter, filter));
			}
			offersToSend = offersToSend.stream().distinct().collect(Collectors.toList());
			if (!offersToSend.isEmpty())
				eventPublisher.publishEvent(new OnSentEmailEvent(user.getEmail(), "Nowe ogłoszenia pasujące do filtra",
						buildContent(offersToSend)));
		}
	}

	@EventListener(WarehousePushEvent.class)
	public void pushToWareHouse(WarehousePushEvent event) {
		try (CloseableHttpClient client = HttpClients.createDefault()) {
			HttpPost httpPost = new HttpPost(warehouseUrl + "/user/action");
			httpPost.setEntity(new StringEntity(event.getParam()));
			client.execute(httpPost);
		} catch (Exception ex) {
			log.error("Exception while passing user action to warehouse. Stacktrace: " + ex);
		}
	}

	public List<FilterListDto> getFilterList() {
		return authService.getLoggedUser().getFilters().stream().map(FilterListDto::from).collect(Collectors.toList());
	}

	public FilterDetailsDto getDetails(Long filterId) {
		Filter filter = filterRepository.findById(filterId)
				.orElseThrow(() -> new ControllerValidationException(new FieldValidator.Builder().errorField("id")
						.status(HttpStatus.NOT_FOUND).errorMessage("Nie istnieje filtr o id ", filterId).build()));
		return FilterDetailsDto.from(filter);
	}

	public void delete(Long filterId) {
		Filter filter = filterRepository.findById(filterId)
				.orElseThrow(() -> new ControllerValidationException(new FieldValidator.Builder().errorField("id")
						.status(HttpStatus.NOT_FOUND).errorMessage("Nie istnieje filtr o id ", filterId).build()));
		filterRepository.delete(filter);
	}

	private String buildContent(List<Offer> input) {
		List<Offer> offersToCheck = offerRepository.findAllById(input.stream().map(Offer::getId).collect(Collectors.toSet()));
		Map<Portal, List<Offer>> offersForPortal = offersToCheck.stream()
				.collect(Collectors.groupingBy(Offer::getPortal));
		StringBuilder builder = new StringBuilder("Nowe oferty które wpłynęły do serwisu: ");
		Set<Portal> portals = offersForPortal.keySet();
		for (Portal portal : portals) {
			builder.append("\n").append("Portal: ").append(portal.getName());
			List<Offer> offers = offersForPortal.get(portal);
			for (int i = 1; i < offers.size(); i++) {
				Offer offer = offers.get(i);
				builder.append("\n").append(i).append(". ").append("Produkt o nazwie: ").append(offer.getName()).append(" ")
						.append(offer.getAmount()).append(" g").append(" w cenie: ").append(offer.getPrice())
						.append(" zł");
			}
		}
		return builder.toString();
	}

	private List<Offer> filter(List<Offer> offers, Filter filter) {
		Stream<Offer> offerStream = offers.stream();
		if (filter.getPriceFrom() != null)
			offerStream = offerStream.filter(offer -> offer.getPrice() > filter.getPriceFrom());
		if (filter.getPriceTo() != null)
			offerStream = offerStream.filter(offer -> offer.getPrice() < filter.getPriceTo());
		if (filter.getAmountFrom() != null)
			offerStream = offerStream.filter(offer -> offer.getAmount() > filter.getAmountFrom());
		if (filter.getAmountTo() != null)
			offerStream = offerStream.filter(offer -> offer.getAmount() < filter.getAmountTo());
		if (filter.getProductName() != null && !filter.getProductName().isBlank())
			offerStream = offerStream
					.filter(offer -> offer.getName().toUpperCase().contains(filter.getProductName().toUpperCase()));
		return offerStream.collect(Collectors.toList());
	}
}
