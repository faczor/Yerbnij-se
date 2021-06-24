package com.yerbnijse.webservice.model.dto.output;

import com.yerbnijse.webservice.model.Offer;
import lombok.Getter;

@Getter
public class OfferDataDto {
  private Long id;
  private String name;
  private Integer amount;
  private Double price;
  private String image;
  private String link;

  public static OfferDataDto from(Offer offer) {
    OfferDataDto dto = new OfferDataDto();
    dto.id = offer.getId();
    dto.name = offer.getName();
    dto.amount = offer.getAmount();
    dto.price = offer.getPrice();
    dto.image = offer.getImage();
    dto.link = offer.getLink();
    return dto;
  }
}
