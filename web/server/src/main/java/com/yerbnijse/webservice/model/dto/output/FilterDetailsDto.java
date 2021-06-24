package com.yerbnijse.webservice.model.dto.output;

import com.yerbnijse.webservice.model.Filter;
import lombok.Getter;

@Getter
public class FilterDetailsDto {
  private Double priceFrom;
  private Double priceTo;
  private Integer amountFrom;
  private Integer amountTo;
  private String productName;
  private String portal;
  private String name;

  public static FilterDetailsDto from(Filter filter) {
    FilterDetailsDto dto = new FilterDetailsDto();
    dto.priceFrom = filter.getPriceFrom();
    dto.priceTo = filter.getPriceTo();
    dto.amountFrom = filter.getAmountFrom();
    dto.amountTo = filter.getAmountTo();
    dto.productName = filter.getProductName();
    dto.portal = filter.getPortal();
    dto.name = filter.getName();
    return dto;
  }
}
