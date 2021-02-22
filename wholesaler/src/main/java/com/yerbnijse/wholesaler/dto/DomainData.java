package com.yerbnijse.wholesaler.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DomainData {
  private String domainName;
  private String productName;
  private Integer productAmount;
  private Double productPrice;
  private String productImage;
  private String productLink;
}
