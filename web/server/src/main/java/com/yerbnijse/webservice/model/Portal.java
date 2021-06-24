package com.yerbnijse.webservice.model;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Portals")
@Getter
@Setter
public class Portal {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "PortalId")
	private Integer id;

	@Column(name = "Name")
	private String name;

	@Column(name = "Link")
	private String link;

	@Column(name = "Logo")
	private String logo;

	@Column(name = "ScrapDate")
	private LocalDateTime scrapDate;

	@Column(name = "Code")
	private String code;

	@Column(name = "LastResponse")
	private Integer lastResponse;

	@OneToMany(mappedBy = "portal")
	private Set<Offer> offers = new HashSet<>();

	@OneToMany(mappedBy = "portal")
	private Set<Duplicate> duplicates = new HashSet<>();
}
