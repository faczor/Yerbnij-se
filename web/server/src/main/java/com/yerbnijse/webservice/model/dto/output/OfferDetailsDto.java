package com.yerbnijse.webservice.model.dto.output;

import com.yerbnijse.webservice.model.Duplicate;
import com.yerbnijse.webservice.model.Favourite;
import com.yerbnijse.webservice.model.Offer;
import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;
import lombok.Getter;
import org.apache.commons.math3.util.Precision;

@Getter
public class OfferDetailsDto {

  private Long id;
  private OfferDataDto offerData;
  private PortalDto portal;
  private List<DuplicateDto> duplicates;
  private RatingDto rating;
  private List<ReactionsDto> reactions;

  public static OfferDetailsDto from(Offer offer) {
    OfferDetailsDto dto = new OfferDetailsDto();
    dto.id = offer.getId();
    dto.offerData = OfferDataDto.from(offer);
    dto.portal = PortalDto.from(offer.getPortal());
    dto.reactions = offer.getFavourites().stream().map(ReactionsDto::from)
        .sorted(Comparator.comparing(ReactionsDto::getDate)).collect(Collectors.toList());
    dto.duplicates = offer.getDuplicates().stream().map(DuplicateDto::from)
        .collect(Collectors.toList());
    dto.rating = RatingDto.from(offer);
    return dto;
  }


  @Getter
  private static class DuplicateDto {

    private PortalDto portal;
    private Double price;
    private String link;

    private static DuplicateDto from(Duplicate duplicate) {
      DuplicateDto dto = new DuplicateDto();
      dto.portal = PortalDto.from(duplicate.getPortal());
      dto.price = duplicate.getPrice();
      dto.link = duplicate.getLink();
      return dto;
    }
  }

  @Getter
  private static class ReactionsDto {

    private String email;
    private String content;
    private Double points;
    private Boolean isFavourite;
    private LocalDateTime date;

    private static ReactionsDto from(Favourite favourite) {
      ReactionsDto dto = new ReactionsDto();
      dto.email = favourite.getUser().getEmail();
      dto.content = favourite.getComment() == null ? "" : favourite.getComment();
      dto.points = favourite.getPoints() == null ? 0.0 : favourite.getPoints();
      dto.isFavourite = favourite.getIsFavourite();
      dto.date = favourite.getDateCreated();
      return dto;
    }
  }

  @Getter
  private static class RatingDto {

    private Double value;
    private String summary;

    public static RatingDto from(Offer offer) {
      RatingDto dto = new RatingDto();
      if (offer.getFavourites() == null || offer.getFavourites().isEmpty()) {
        dto.summary = "0/5 (0 ocen)";
        dto.value = 0.0;
      } else {
        int size = 0;
        double sum = 0;
        for (Favourite favourite : offer.getFavourites()) {
          if (favourite.getPoints() != null) {
            size++;
            sum += favourite.getPoints();
          } else {
            size++;
          }
        }
        dto.summary = String.format("%s/5 (%s ocen)", Precision.round(sum / size, 2), size);
        dto.value = Precision.round(sum / size, 2);
      }
      return dto;
    }
  }
}
