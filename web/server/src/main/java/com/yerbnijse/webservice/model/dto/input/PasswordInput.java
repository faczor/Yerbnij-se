package com.yerbnijse.webservice.model.dto.input;

import com.yerbnijse.webservice.validator.ValidPassword;
import javax.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class PasswordInput {
	@ValidPassword
	@NotNull(message = "Hasło nie może być puste.")
	private String password;

	@ValidPassword
	@NotNull(message = "Powtórzone hasło nie może być puste.")
	private String repeatPassword;
}
