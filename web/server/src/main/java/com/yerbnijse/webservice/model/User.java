package com.yerbnijse.webservice.model;

import com.yerbnijse.webservice.model.dto.input.PersonalDataInput;
import com.yerbnijse.webservice.service.security.UserInfo.OAuth2UserInfo;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
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
@Table(name = "Users")
@Getter
@Setter
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "UserId")
	private Long id;

	@Column(name = "Email")
	private String email;

	@Column(name = "Password")
	private String password;

	@Column(name = "Name")
	private String name;

	@Column(name = "Surname")
	private String surname;

	@Enumerated(EnumType.STRING)
	@Column(name = "Provider")
	private AuthProvider authProvider;

	@ManyToOne
	@JoinColumn(name = "RoleId")
	private Role role;

	@OneToMany(mappedBy = "user")
	private Set<Filter> filters = new HashSet<>();

	@OneToMany(mappedBy = "user")
	private Set<Favourite> favourites = new HashSet<>();

	public static User register(String name, String surname, String email, String password, Role role,
			AuthProvider authProvider) {
		User user = new User();
		user.setName(name);
		user.setSurname(surname);
		user.setEmail(email);
		user.setPassword(password);
		user.setRole(role);
		user.setAuthProvider(authProvider);
		return user;
	}

	public static User fromOauthInfo(OAuth2UserInfo info) {
		User user = new User();
		user.setAuthProvider(info.getProvider());
		user.setName(info.getName());
		user.setEmail(info.getEmail());
		user.setPassword("OAUTH_PASSWORD");
		return user;
	}

	public void changePersonal(PersonalDataInput input) {
		this.name = input.getName();
		this.surname = input.getSurname();
	}
}
