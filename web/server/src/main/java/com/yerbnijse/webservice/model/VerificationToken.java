package com.yerbnijse.webservice.model;

import java.time.LocalDateTime;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "VerificationTokens")
@RequiredArgsConstructor
public class VerificationToken {

	@Id
	@Column(nullable = false, name = "Token", unique = true)
	private String token;

	@OneToOne(targetEntity = User.class, fetch = FetchType.EAGER)
	@JoinColumn(nullable = false, name = "UserId")
	private User user;

	@Column(name = "ExpiryDate")
	private LocalDateTime expiryDate;

	@Column(name = "RoleId")
	private Long roleId;

	public VerificationToken(String token, User user) {
		this.user = user;
		this.token = token;
		this.expiryDate = LocalDateTime.now().plusDays(7);
	}
}