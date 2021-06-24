package com.yerbnijse.webservice.model.dto.input;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginInput {
	@NotNull(message = "Email nie może być pusty.")
	@NotBlank(message = "Email nie może być pusty.")
	private String email;

	@NotNull(message = "Hasło nie może być puste.")
	@NotBlank(message = "Hasło nie może być puste.")
	private String password;
}
