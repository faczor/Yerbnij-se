package com.yerbnijse.webservice.service;

import com.yerbnijse.webservice.model.User;
import com.yerbnijse.webservice.model.VerificationToken;
import com.yerbnijse.webservice.model.dto.FieldValidator;
import com.yerbnijse.webservice.model.dto.Pagination;
import com.yerbnijse.webservice.model.dto.PagingResult;
import com.yerbnijse.webservice.model.dto.input.PasswordChangeInput;
import com.yerbnijse.webservice.model.dto.input.RegisterInput;
import com.yerbnijse.webservice.model.dto.output.UserAdminListDto;
import com.yerbnijse.webservice.model.exception.ControllerValidationException;
import com.yerbnijse.webservice.repository.UserRepository;
import com.yerbnijse.webservice.util.enums.Roles;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@AllArgsConstructor
public class AdminService {

  private final UserRepository userRepository;
  private final UserAuthService authService;
  private final RoleService roleService;

  public PagingResult getUsers(Roles role, String chIn, Pagination pagination) {
    return PagingResult.from(userRepository.findForAdminList(role == null ? null : role.getId(),
        chIn, pagination.resolve()), UserAdminListDto.class, User.class);
  }

  public void activate(Long id) {
    User user = getUserById(id);
    VerificationToken verificationToken = authService.getTokenForUser(user);
    if (verificationToken != null) {
      user.setRole(roleService.getRoleBy(Roles.getById(verificationToken.getRoleId())));
      authService.removeToken(verificationToken);
    } else {
      user.setRole(roleService.getRoleBy(Roles.USER));
    }
    userRepository.save(user);
    log.info(String.format("Użytkownik o emailu: %s Aktywowano użytkownika o emailu: %s",
        authService.logUser(), user.getEmail()));
  }

  private User getUserById(Long id) {
    return userRepository.findById(id).orElseThrow(() ->  new ControllerValidationException(
        new FieldValidator.Builder().status(HttpStatus.NOT_FOUND).errorField("userId").errorMessage("Nie znaleziono użytkownika o id %s", id).build()));
  }

  public void delete(Long id) {
    User user = getUserById(id);
    log.info(String.format("Użytkownik o emailu %s usunął użytkownika o emailu %s",
        authService.logUser(), user.getEmail()));
    userRepository.delete(user);
  }

  public void changeEmail(Long id, String email) {
    User user = getUserById(id);
    if (userRepository.findByEmail(email).isPresent())
      throw new ControllerValidationException(new FieldValidator.Builder()
          .errorMessage("Istnieje użytkownik o podanym emailu").status(HttpStatus.BAD_REQUEST)
          .errorField("email").build());
    user.setEmail(email);
    log.info(String.format("Uytkownik o emailu: %s zmienił email użytkownika %s na email %s",
        authService.logUser(), user.getEmail(), email));
    userRepository.save(user);
  }

  public void resetPassword(Long id) {
    User user = getUserById(id);
    authService.remindPassword(user.getEmail());
    log.info(String.format("Użytkownik o emailu %s zresetował hasło użytkownika %s",
        authService.logUser(), user.getEmail()));
  }

  public void changePassword(Long id, PasswordChangeInput input) {
    User user = getUserById(id);
    authService.changePassword(user, input.getPassword());
    userRepository.save(user);
    log.info(String.format("Użytkownik %s zmienił ręcznie hasło użytkownika %s",
        authService.logUser(), user.getEmail()));
  }

  public void changeRole(Long id, Roles role) {
    User user = getUserById(id);
    user.setRole(roleService.getRoleBy(role));
    log.info(String.format("Użytkownik %s zmienił rolę użytkownika %s na: %s",
        authService.logUser(), user.getEmail(), user.getRole().getName()));
    userRepository.save(user);
  }

  public void registerUser(Roles roles, RegisterInput input) {
    authService.registerUser(input, roles);
  }
}
