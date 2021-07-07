package com.yerbnijse.webservice.controller;

import com.yerbnijse.webservice.model.dto.input.ChangePasswordInput;
import com.yerbnijse.webservice.model.dto.input.PersonalDataInput;
import com.yerbnijse.webservice.service.UserService;
import javax.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/user")
public class UserController {

	private final UserService userService;

	@PutMapping("/personal")
	public ResponseEntity<?> editPersonalDetails(@RequestBody @Valid PersonalDataInput input) {
		return ResponseEntity.ok(userService.edit(input));
	}

	@PutMapping("/password")
	public ResponseEntity<?> editPassword(@RequestBody @Valid ChangePasswordInput input) {
		return ResponseEntity.ok(userService.changePassword(input));
	}
}
