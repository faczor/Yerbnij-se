package com.yerbnijse.webservice.model.dto.input;

import com.yerbnijse.webservice.validator.PasswordMatches;
import com.yerbnijse.webservice.validator.ValidPassword;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import lombok.Getter;

@Getter
@PasswordMatches
public class ChangePasswordInput {
  @NotNull(message = "Stare hasło nie może być puste.")
  @NotBlank(message = "Stare hasło nie może być puste.")
  private String oldPassword;

  @ValidPassword
  @NotNull(message = "Hasło nie może być puste.")
  private String password;

  @ValidPassword
  @NotNull(message = "Powtórzone hasło nie może być puste.")
  private String repeatPassword;
}
