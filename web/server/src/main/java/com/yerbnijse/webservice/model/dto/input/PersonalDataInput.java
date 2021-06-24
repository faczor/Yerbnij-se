package com.yerbnijse.webservice.model.dto.input;

import com.yerbnijse.webservice.validator.ValidName;
import javax.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class PersonalDataInput {

	@NotBlank(message = "Imie nie może być puste.")
	@ValidName(message = "Imie powinno zaczynać się z dużej litery")
	private String name;

	@NotBlank(message = "Nazwisko nie może być puste.")
	@ValidName(message = "Nazwisko powinno zaczynać się z dużej litery")
	private String surname;
}
