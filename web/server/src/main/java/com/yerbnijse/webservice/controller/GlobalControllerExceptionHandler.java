package com.yerbnijse.webservice.controller;

import com.yerbnijse.webservice.model.exception.ControllerValidationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;

@RestController
@ControllerAdvice
public class GlobalControllerExceptionHandler {

	@ExceptionHandler(value = ControllerValidationException.class)
	protected ResponseEntity<?> handleEntityAlreadyExists(ControllerValidationException e) {
		return ResponseEntity.status(e.getValidator().getStatus()).body(e.getValidator().getErrors());
	}
}
