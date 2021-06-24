package com.yerbnijse.webservice.model.exception;

import com.yerbnijse.webservice.model.dto.FieldValidator;
import lombok.Getter;

public class ControllerValidationException extends RuntimeException {

	@Getter
	private final FieldValidator validator;

	public ControllerValidationException(FieldValidator validator) {
		this.validator = validator;
	}
}
