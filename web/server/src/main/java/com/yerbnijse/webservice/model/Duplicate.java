package com.yerbnijse.webservice.model;

import com.yerbnijse.webservice.model.dto.input.OfferInput;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "Duplicates")
@Getter
@Setter
@NoArgsConstructor
public class Duplicate {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "DuplicateId")
	private Long id;

	@Column(name = "Price")
	private Double price;

	@Column(name = "Link")
	private String link;

	@ManyToOne
	@JoinColumn(name = "PortalId")
	private Portal portal;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "OfferId")
	private Offer offer;

	public static Duplicate from(Offer offer) {
		Duplicate duplicate = new Duplicate();
		duplicate.price = offer.getPrice();
		duplicate.portal = offer.getPortal();
		duplicate.offer = offer;
		duplicate.link = offer.getLink();
		return duplicate;
	}

	public static Duplicate from(OfferInput incoming, Portal portal, Offer offer) {
		Duplicate duplicate = new Duplicate();
		duplicate.price = incoming.getProductPrice();
		duplicate.portal = portal;
		duplicate.link = incoming.getProductLink();
		duplicate.offer = offer;
		return duplicate;
	}

	public Duplicate swap(Duplicate duplicate) {
		this.price = duplicate.getPrice();
		this.portal = duplicate.getPortal();
		this.link = duplicate.getLink();
		return this;
	}
}
