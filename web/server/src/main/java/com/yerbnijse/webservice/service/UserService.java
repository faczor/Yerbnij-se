package com.yerbnijse.webservice.service;

import com.yerbnijse.webservice.model.User;
import com.yerbnijse.webservice.model.dto.FieldValidator;
import com.yerbnijse.webservice.model.dto.input.ChangePasswordInput;
import com.yerbnijse.webservice.model.dto.input.PersonalDataInput;
import com.yerbnijse.webservice.model.dto.output.UserDetailsDto;
import com.yerbnijse.webservice.model.exception.ControllerValidationException;
import com.yerbnijse.webservice.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

  private final UserRepository userRepository;
  private final UserAuthService authService;
  private final PasswordEncoder encoder;

  public UserDetailsDto edit(PersonalDataInput input) {
    User user = authService.getLoggedUser();
    user.changePersonal(input);
    return UserDetailsDto.from(userRepository.save(user));
  }

  public UserDetailsDto changePassword(ChangePasswordInput input) {
    User user = authService.getLoggedUser();
    if (!encoder.matches(input.getOldPassword(), user.getPassword())) {
      throw new ControllerValidationException(
          new FieldValidator.Builder()
              .errorField("oldPassword")
              .status(HttpStatus.BAD_REQUEST)
              .errorMessage("Podane hasło nie jest poprawne")
              .build());
    }
    authService.changeUserPassword(user, input.getPassword());
    return UserDetailsDto.from(userRepository.save(user));
  }
}
