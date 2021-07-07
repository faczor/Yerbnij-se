package com.yerbnijse.webservice.model.dto.input;

import javax.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class ContactDto {
  @NotNull private String content;

  @NotNull private String title;
}
