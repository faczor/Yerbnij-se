package com.yerbnijse.webservice.model.dto.output;

import com.yerbnijse.webservice.model.Favourite;
import com.yerbnijse.webservice.model.Offer;
import com.yerbnijse.webservice.model.dto.DtoWithPaging;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import org.apache.commons.math3.util.Precision;

@Getter
public class OfferListDto implements DtoWithPaging {
	private Long id;
	private ReactionDto reaction;
	private OfferDataDto offer;
	private PortalDto portal;

	public static OfferListDto from(Offer offer) {
		OfferListDto dto = new OfferListDto();
		dto.id = offer.getId();
		dto.offer = OfferDataDto.from(offer);
		dto.portal = PortalDto.from(offer.getPortal());
		dto.reaction = ReactionDto.from(offer);
		return dto;
	}

	@Override
	@SuppressWarnings("unchecked") // CASTING VALIDATION IS DONE IN PagingResult.class
	public List<DtoWithPaging> toDtoResult(List<?> data) {
		List<Offer> offers = (List<Offer>) data;
		return offers.stream().map(OfferListDto::from).collect(Collectors.toList());
	}

	@Getter
	private static class ReactionDto {

		private String rating;

		public static ReactionDto from(Offer offer) {
			ReactionDto dto = new ReactionDto();
			if (offer.getFavourites() == null || offer.getFavourites().isEmpty()) {
				dto.rating = "0/5 (0 ocen)";
			} else {
				int size = 0;
				double sum = 0;
				for (Favourite favourite: offer.getFavourites()) {
					if (favourite.getPoints() != null) {
						size++;
						sum += favourite.getPoints();
					} else {
						size++;
					}
				}
				dto.rating = String.format("%s/5 (%s ocen)", Precision.round(sum/size,2), size);
			}
			return dto;
		}
	}
}
