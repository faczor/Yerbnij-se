package com.yerbnijse.webservice.model.dto.input;

import com.yerbnijse.webservice.validator.PasswordMatches;
import com.yerbnijse.webservice.validator.ValidName;
import com.yerbnijse.webservice.validator.ValidPassword;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@PasswordMatches
public class RegisterInput {

	@NotBlank(message = "Imie nie może być puste.")
	@ValidName(message = "Imie powinno zaczynać się z dużej litery")
	private String name;

	@NotBlank(message = "Nazwisko nie może być puste.")
	@ValidName(message = "Nazwisko powinno zaczynać się z dużej litery")
	private String surname;

	@NotNull(message = "Email nie może być pusty.")
	@Email(message = "Nie poprawny email.")
	private String email;

	@ValidPassword
	@NotNull(message = "Hasło nie może być puste.")
	private String password;

	@ValidPassword
	@NotNull(message = "Powtórzone hasło nie może być puste.")
	private String repeatPassword;
}
