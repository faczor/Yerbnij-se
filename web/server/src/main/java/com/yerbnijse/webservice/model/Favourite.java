package com.yerbnijse.webservice.model;

import com.yerbnijse.webservice.model.dto.input.FavouriteInput;
import java.time.LocalDateTime;
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
import lombok.Setter;

@Entity
@Table(name = "Favourites")
@Getter
@Setter
public class Favourite {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "FavouriteId")
	private Long id;

	@Column(name = "isFavourite")
	private Boolean isFavourite;

	@Column(name = "Comment", columnDefinition = "TEXT")
	private String comment;

	@Column(name = "StarPoints")
	private Double points;

	@Column(name = "DateCreated")
	private LocalDateTime dateCreated;

	@ManyToOne
	@JoinColumn(name = "UserId")
	private User user;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "OfferId")
	private Offer offer;

	public static Favourite of(User user, FavouriteInput input, Offer offer) {
		Favourite favourite = new Favourite();
		favourite.edit(input);
		favourite.user = user;
		favourite.offer = offer;
		favourite.dateCreated = LocalDateTime.now();
		return favourite;
	}

	public static Favourite favourite(User user, Offer offer) {
		Favourite favourite = new Favourite();
		favourite.isFavourite = true;
		favourite.user = user;
		favourite.offer = offer;
		favourite.dateCreated = LocalDateTime.now();
		return favourite;
	}

	public void edit(FavouriteInput input) {
		this.isFavourite = input.getIsFavourite() != null && input.getIsFavourite();
		if (input.getComment() != null) {
			this.comment = input.getComment();
		}
		if (input.getPoints() != null) {
			this.points = input.getPoints();
		}
	}

	public void switchFavourite() {
		if (this.isFavourite == null) {
			this.isFavourite = true;
		} else {
			this.isFavourite = !this.isFavourite;
		}
	}
}
