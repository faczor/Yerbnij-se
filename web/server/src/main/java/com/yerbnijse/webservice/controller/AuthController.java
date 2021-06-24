package com.yerbnijse.webservice.controller;

import com.yerbnijse.webservice.model.dto.FieldValidator;
import com.yerbnijse.webservice.model.dto.input.LoginInput;
import com.yerbnijse.webservice.model.dto.input.RegisterInput;
import com.yerbnijse.webservice.model.dto.output.UserDetailsDto;
import com.yerbnijse.webservice.model.exception.LoginException;
import com.yerbnijse.webservice.service.UserAuthService;
import com.yerbnijse.webservice.util.enums.Roles;
import java.util.Map;
import javax.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

	private final UserAuthService authService;

	private static final String EMAIL_VALIDATION_RESPONSE = "Użytkownik z podanym emailem już istnieje.";
	private static final String LOGIN_ERROR_RESPONSE = "Nie poprawny login lub hasło.";

	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody @Valid RegisterInput input) {
		if (authService.registerUser(input, Roles.USER))
			return ResponseEntity.ok("User created successfully.");
		return ResponseEntity.badRequest().body(new FieldValidator.Builder().status(HttpStatus.BAD_REQUEST)
				.errorField("email").errorMessage(EMAIL_VALIDATION_RESPONSE).build());
	}

	@PostMapping("/login")
	public ResponseEntity<?> authenticate(@RequestBody @Valid LoginInput input) {
		try {
			return ResponseEntity.ok(authService.login(input));
		} catch (LoginException exception) {
			return ResponseEntity.badRequest().body(new FieldValidator.Builder().status(HttpStatus.BAD_REQUEST)
					.errorField("global").errorMessage(LOGIN_ERROR_RESPONSE).build());
		}
	}

	@GetMapping("/me")
	@PreAuthorize("hasAnyAuthority('USER', 'ADMIN')")
	public ResponseEntity<?> test() {
		return ResponseEntity.ok(UserDetailsDto.from(authService.getLoggedUser()));
	}

	@GetMapping("/verify-email")
	public ResponseEntity<String> verifyEmail(@RequestParam String token) {
		return ResponseEntity.ok(authService.verify(token));
	}

	@PostMapping("/remind")
	public ResponseEntity<String> remindPassword(@RequestBody Map<String, String> input) {
		return ResponseEntity.ok(authService.remindPassword(input.get("email")));
	}
}
