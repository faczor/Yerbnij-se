package com.yerbnijse.webservice.model.dto.input;

import com.yerbnijse.webservice.util.enums.PortalEnum;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OfferInput {
	private PortalEnum domain;
	private String productName;
	private Integer productAmount;
	private Double productPrice;
	private String productImage;
	private String productLink;
}
