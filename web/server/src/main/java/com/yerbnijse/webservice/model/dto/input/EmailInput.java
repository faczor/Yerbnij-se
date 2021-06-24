package com.yerbnijse.webservice.model.dto.input;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class EmailInput {
  @Email
  @NotNull
  private String email;
}
