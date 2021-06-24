package com.yerbnijse.webservice.service;

import com.yerbnijse.webservice.model.User;
import com.yerbnijse.webservice.model.dto.input.PasswordInput;
import com.yerbnijse.webservice.model.dto.input.PersonalDataInput;
import com.yerbnijse.webservice.model.dto.output.UserDetailsDto;
import com.yerbnijse.webservice.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final UserAuthService authService;

	public UserDetailsDto edit(PersonalDataInput input) {
		User user = authService.getLoggedUser();
		user.changePersonal(input);
		return UserDetailsDto.from(userRepository.save(user));
	}

	public UserDetailsDto changePassword(PasswordInput input) {
		User user = authService.getLoggedUser();
		authService.changeUserPassword(user, input.getPassword());
		return UserDetailsDto.from(userRepository.save(user));
	}
}
