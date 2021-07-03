package com.yerbnijse.wholesaler.dto;

import com.yerbnijse.wholesaler.model.Domain;
import com.yerbnijse.wholesaler.model.DomainObject;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class DomainOutput {
  private Domain domain;
  private String productName;
  private Integer productAmount;
  private Double productPrice;
  private String productImage;
  private String productLink;

  public static DomainOutput fromData(DomainObject data, Domain domain) {
    DomainOutput domainObject = new DomainOutput();
    domainObject.setDomain(domain);
    domainObject.setProductName(data.getProductName());
    domainObject.setProductAmount(data.getProductAmount());
    domainObject.setProductPrice(data.getProductPrice());
    domainObject.setProductImage(data.getProductImage());
    domainObject.setProductLink(data.getProductLink());
    return domainObject;
  }
}
