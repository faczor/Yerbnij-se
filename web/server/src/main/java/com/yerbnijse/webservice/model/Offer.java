package com.yerbnijse.webservice.model;

import com.yerbnijse.webservice.model.dto.input.FavouriteInput;
import com.yerbnijse.webservice.model.dto.input.OfferInput;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Offers")
@Getter
@Setter
public class Offer {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "OfferId")
	private Long id;

	@Column(name = "Name")
	private String name;

	@Column(name = "Amount")
	private Integer amount;

	@Column(name = "Price")
	private Double price;

	@Column(name = "Image")
	private String image;

	@Column(name = "Link")
	private String link;

	@ManyToOne
	@JoinColumn(name = "PortalId")
	private Portal portal;

	@OneToMany(mappedBy = "offer", cascade = CascadeType.ALL)
	private Set<Duplicate> duplicates = new HashSet<>();

	@OneToMany(mappedBy = "offer", cascade = CascadeType.ALL)
	private Set<Favourite> favourites = new HashSet<>();

	public static Offer from(OfferInput input, Portal portal) {
		Offer offer = new Offer();
		offer.name = input.getProductName();
		offer.amount = input.getProductAmount();
		offer.price = input.getProductPrice();
		offer.image = input.getProductImage();
		offer.link = input.getProductLink();
		offer.portal = portal;
		return offer;
	}

	public void addDuplicate(Duplicate duplicate) {
		this.duplicates.add(duplicate);
	}

	public Offer setData(OfferInput input, Portal portal) {
		this.price = input.getProductPrice();
		this.image = input.getProductImage();
		this.link = input.getProductLink();
		this.portal = portal;
		return this;
	}

	public Offer swap(Duplicate duplicate) {
		this.price = duplicate.getPrice();
		this.link = duplicate.getLink();
		this.portal = duplicate.getPortal();
		return this;
	}

	public void addFavourite(User user, FavouriteInput input) {
		this.favourites.add(Favourite.of(user, input, this));
	}

	public Offer setPriceAndReturn(Double productPrice) {
		this.setPrice(productPrice);
		return this;
	}

  public void newFavourite(User user) {
		this.favourites.add(Favourite.favourite(user, this));
  }
}
