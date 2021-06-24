package com.yerbnijse.webservice.model.dto.output;

import com.yerbnijse.webservice.auth.UserDetailsImpl;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthDto {
	private String token;
	private Long userId;
	private String email;
	private String role;

	public static AuthDto from(String jwt, UserDetailsImpl userDetails, String role) {
		AuthDto dto = new AuthDto();
		dto.setToken(jwt);
		dto.setUserId(userDetails.getId());
		dto.setEmail(userDetails.getUsername());
		dto.setRole(role);
		return dto;
	}
}
