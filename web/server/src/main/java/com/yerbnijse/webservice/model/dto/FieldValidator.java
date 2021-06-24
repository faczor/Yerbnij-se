package com.yerbnijse.webservice.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.HttpStatus;

// TODO: 3/10/21 EXTEND CLASS LATER. NOW ITS ONLY TO SIMULATE RESPONSE OF @VALID ERRORS MESSAGE
@Getter
@Setter
public class FieldValidator {
	private Integer status;
	private String message;
	private List<ValidationError> errors;

	private FieldValidator(Builder builder) {
		this.status = builder.status.value();
		this.message = builder.status.name();
		this.errors = List.of(new ValidationError(builder.errorMessage, builder.errorField));
	}

	@Getter
	@Setter
	@AllArgsConstructor(access = AccessLevel.PRIVATE)
	private static class ValidationError {
		@JsonProperty("defaultMessage")
		private String message;

		private String field;
	}

	public static class Builder {
		private HttpStatus status;
		private String errorMessage;
		private String errorField;

		public Builder status(int value) {
			status = HttpStatus.valueOf(value);
			return this;
		}

		public Builder status(HttpStatus value) {
			status = value;
			return this;
		}

		public Builder status(String value) {
			status = HttpStatus.valueOf(value);
			return this;
		}

		public Builder errorMessage(String value, Object... params) {
			errorMessage = String.format(value, params);
			return this;
		}

		public Builder errorField(String value) {
			errorField = value;
			return this;
		}

		public FieldValidator build() {
			return new FieldValidator(this);
		}
	}
}
