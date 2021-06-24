package com.yerbnijse.webservice.model;

import com.yerbnijse.webservice.model.dto.input.FilterInput;
import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "Filters")
public class Filter {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FilterId")
	private Long id;

	@Column(name = "FilterName")
	private String name;

	@Column(name = "PriceFrom")
	private Double priceFrom;

	@Column(name = "PriceTo")
	private Double priceTo;

	@Column(name = "AmountFrom")
	private Integer amountFrom;

	@Column(name = "AmountTo")
	private Integer amountTo;

	@Column(name = "ProductName")
	private String productName;

	@Column(name = "Portal")
	private String portal;

	@ManyToOne
	@JoinColumn(name = "UserId")
	private User user;

	public static Filter from(FilterInput filterInput, User user) {
		Filter filter = new Filter();
		filter.setFields(filterInput);
		filter.user = user;
		return filter;
	}

	public void edit(FilterInput filterInput) {
		this.setFields(filterInput);
	}

	private void setFields(FilterInput filterInput) {
		this.name = filterInput.getName() == null || filterInput.getName().isBlank() ? LocalDateTime.now().toString() : filterInput.getName();
		this.productName = filterInput.getProductName();
		this.priceFrom = filterInput.getPriceFrom();
		this.priceTo = filterInput.getPriceTo();
		this.amountFrom = filterInput.getAmountFrom();
		this.amountTo = filterInput.getAmountTo();
		this.portal = filterInput.getPortal();
	}
}
