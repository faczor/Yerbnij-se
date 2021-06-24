package com.yerbnijse.webservice.model.dto.output;

import com.yerbnijse.webservice.model.User;
import lombok.Getter;

@Getter
public class UserDetailsDto {
	private String name;
	private String surname;
	private String email;
	private String role;

	public static UserDetailsDto from(User user) {
		UserDetailsDto dto = new UserDetailsDto();
		dto.name = user.getName();
		dto.surname = user.getSurname();
		dto.email = user.getEmail();
		dto.role = user.getRole().getName();
		return dto;
	}
}
