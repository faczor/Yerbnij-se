package com.yerbnijse.webservice.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "Roles")
@Getter
@Setter
public class Role {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "RoleId")
	private Long id;

	@Column(name = "Name")
	private String name;

	@OneToMany(mappedBy = "role")
	private Set<User> users;
}
