package com.yerbnijse.webservice.validator;

import com.yerbnijse.webservice.model.dto.input.ChangePasswordInput;
import com.yerbnijse.webservice.model.dto.input.PasswordChangeInput;
import com.yerbnijse.webservice.model.dto.input.RegisterInput;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {
	@Override
	public void initialize(PasswordMatches constraintAnnotation) {
	}

	@Override
	public boolean isValid(Object o, ConstraintValidatorContext constraintValidatorContext) {
		boolean isValid;
		if (o instanceof ChangePasswordInput) {
			ChangePasswordInput input = (ChangePasswordInput) o;
			isValid = input.getPassword().equals(input.getRepeatPassword());
		} else if (o instanceof PasswordChangeInput) {
			PasswordChangeInput input = (PasswordChangeInput) o;
			isValid = input.getPassword().equals(input.getRepeatPassword());
		} else {
			RegisterInput input = (RegisterInput) o;
			isValid = input.getPassword().equals(input.getRepeatPassword());
		}
		if (!isValid)
			constraintValidatorContext
					.buildConstraintViolationWithTemplate("Hasła muszą do siebie pasować.")
					.addPropertyNode("password").addConstraintViolation();
		return isValid;
	}
}
