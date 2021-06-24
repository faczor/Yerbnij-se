package com.yerbnijse.webservice.model.dto.input;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ContactDto {
  @NotNull
  private String content;

  @Email
  @NotNull
  private String email;

  @NotNull
  private String title;
}
