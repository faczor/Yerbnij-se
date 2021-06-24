package com.yerbnijse.webservice.model.dto.input;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FilterInput {
	@NotNull
	@NotBlank
	private String name;
	private Double priceFrom;
	private Double priceTo;
	private Integer amountFrom;
	private Integer amountTo;
	private String productName;
	private String portal;
}
