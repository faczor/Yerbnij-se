package com.yerbnijse.wholesaler.model;

import com.yerbnijse.wholesaler.dto.DomainData;
import lombok.EqualsAndHashCode;
import lombok.EqualsAndHashCode.Exclude;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class DomainObject {
  private String productName;
  private Boolean isVisible;
  private Integer productAmount;
  private Double productPrice;
  private String productImage;
  private String productLink;
  private LocalDateTime incomingDate;

  public static DomainObject fromData(DomainData data) {
    DomainObject domainObject = new DomainObject();
    domainObject.setProductName(data.getProductName());
    domainObject.setProductAmount(data.getProductAmount());
    domainObject.setProductPrice(data.getProductPrice());
    domainObject.setProductImage(data.getProductImage());
    domainObject.setIncomingDate(LocalDateTime.now());
    domainObject.setProductLink(data.getProductLink());
    domainObject.setIsVisible(true);
    return domainObject;
  }

  public void setFields(DomainObject data) {
    this.productName = data.getProductName();
    this.productAmount = data.getProductAmount();
    this.productPrice = data.getProductPrice();
    this.productImage = data.getProductImage();
    this.productLink = data.getProductLink();
    this.incomingDate = data.getIncomingDate();
    this.isVisible = data.getIsVisible();
  }
}
