package com.yerbnijse.webservice.service;

import static java.lang.String.format;

import com.yerbnijse.webservice.auth.TokenProvider;
import com.yerbnijse.webservice.auth.UserDetailsImpl;
import com.yerbnijse.webservice.model.AuthProvider;
import com.yerbnijse.webservice.model.User;
import com.yerbnijse.webservice.model.VerificationToken;
import com.yerbnijse.webservice.model.dto.FieldValidator;
import com.yerbnijse.webservice.model.dto.input.LoginInput;
import com.yerbnijse.webservice.model.dto.input.RegisterInput;
import com.yerbnijse.webservice.model.dto.output.AuthDto;
import com.yerbnijse.webservice.event.OnSentEmailEvent;
import com.yerbnijse.webservice.model.exception.ControllerValidationException;
import com.yerbnijse.webservice.model.exception.UserNotFoundException;
import com.yerbnijse.webservice.repository.UserRepository;
import com.yerbnijse.webservice.repository.VerificationTokenRepository;
import com.yerbnijse.webservice.util.PasswordUtil;
import com.yerbnijse.webservice.util.enums.Roles;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserAuthService {

	private static final String MESSAGE = "Dziekujemy za rejestracje w serwisie, oto Twoj link aktywacyjny: \n";
	private static final String SUBJECT = "Portal yerbnij se, potwierdzenie rejestracji";
	private static final String URL = "/login/";

	private final AuthenticationManager authenticationManager;
	private final UserRepository userRepository;
	private final RoleService roleService;
	private final PasswordEncoder encoder;
	private final TokenProvider tokenProvider;
	private final VerificationTokenRepository verificationTokenRepository;
	private final ApplicationEventPublisher eventPublisher;

	@Value("${app.web.host}")
	private String host;

	public boolean registerUser(RegisterInput input, Roles roles) {
		if (userRepository.existsByEmail(input.getEmail())) {
			return false;
		}
		User user = userRepository.save(User.register(input.getName(), input.getSurname(),
				input.getEmail(), encoder.encode(input.getPassword()),
				roleService.getRoleBy(Roles.NOT_VERIFIED), AuthProvider.local));
		log.info("Zarejestrowano nowe konto o emailu: " + user.getEmail());
		createVerificationEmail(input.getEmail(), roles.getId());
		return true;
	}

	public AuthDto login(LoginInput input) {
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = tokenProvider.generateJwtToken(authentication);

		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
				.collect(Collectors.toList());
		if (roles.get(0).equals(Roles.NOT_VERIFIED.name()))
			throw new ControllerValidationException(new FieldValidator.Builder().errorMessage("Należy aktywować konto poprzez link przeszłany na email").errorField("role").status(HttpStatus.FORBIDDEN).build());
		return AuthDto.from(jwt, userDetails, roles.get(0));
	}

	public String me() {
		User user = getLoggedUser();
		return user.getEmail();
	}

	public User getLoggedUser() {
		UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication()
				.getPrincipal();
		return userRepository.findByEmail(userDetails.getUsername()).get();
	}

	public String verify(String token) {
		Optional<VerificationToken> verificationToken = verificationTokenRepository.findByToken(token);
		if (verificationToken.isEmpty() || verificationToken.get().getToken().isEmpty()) {
			throw new ControllerValidationException(
					new FieldValidator.Builder().errorField("token").status(HttpStatus.NOT_FOUND)
							.errorMessage("Nieprawidłowy token.", verificationToken.get()).build());
		}

		if (LocalDateTime.now().isAfter(verificationToken.get().getExpiryDate())) {
			createVerificationEmail(verificationToken.get().getUser().getEmail(),
					verificationToken.get().getRoleId());
			throw new ControllerValidationException(
					new FieldValidator.Builder().errorField("token").status(HttpStatus.UNPROCESSABLE_ENTITY)
							.errorMessage("Token stracił ważność. Wysłaliśmy nowy na podany email.",
									verificationToken.get())
							.build());
		}

		User user = verificationToken.get().getUser();
		user.setRole(roleService.getRoleBy(Roles.getById(verificationToken.get().getRoleId())));
		userRepository.save(user);
		verificationTokenRepository.delete(verificationToken.get());
		return "Twój adres email został pomyślnie zweryfikowany.";
	}

	private void createVerificationEmail(String email, Long roleId) {
		String token = generateToken();
		Optional<VerificationToken> tokenExists = verificationTokenRepository.findByToken(token);
		User user = userRepository.findByEmail(email).orElseThrow(UserNotFoundException::new);

		if (tokenExists.isPresent() && tokenExists.get().getUser().equals(user)) {
			sendVerificationEmailToUser(user, tokenExists.get());
			return;
		}

		while (tokenExists.isPresent() && !tokenExists.get().getUser().equals(user)) {
			token = generateToken();
			tokenExists = verificationTokenRepository.findByToken(token);
		}
		VerificationToken verificationToken =
				getVerificationTokenToUserAndSaveInDB(token, user, roleId);
		sendVerificationEmailToUser(verificationToken.getUser(), verificationToken);
	}

	private String generateToken() {
		return UUID.randomUUID().toString();
	}

	private VerificationToken getVerificationTokenToUserAndSaveInDB(String token, User user, Long roleId) {
		VerificationToken verificationToken = new VerificationToken(token, user);
		verificationToken.setRoleId(roleId);
		verificationTokenRepository.save(verificationToken);
		return verificationToken;
	}

	private void sendVerificationEmailToUser(User user, VerificationToken verificationToken) {
		String confirmationUrl = URL + verificationToken.getToken();
		eventPublisher.publishEvent(new OnSentEmailEvent(user.getEmail(), SUBJECT, MESSAGE + host + confirmationUrl));
	}

	public void changeUserPassword(User user, String password) {
		user.setPassword(encoder.encode(password));
	}

	public String remindPassword(String email) {
		if (email == null || email.isBlank())
			throw new ControllerValidationException(new FieldValidator.Builder().errorField("email")
					.status(HttpStatus.BAD_REQUEST).errorMessage("Email nie może być pusty.").build());
		User user =
				userRepository.findByEmail(email).orElseThrow(() -> new ControllerValidationException(
						new FieldValidator.Builder().errorMessage("Nie znaleziono użytkownika o podanym emailu").build()));
		String newPassword = PasswordUtil.generate();
		user.setPassword(encoder.encode(newPassword));
		userRepository.save(user);
		eventPublisher.publishEvent(
				new OnSentEmailEvent(user.getEmail(), "Przypomnienie hasła - Portal rekrutacyjny Zabrze",
						format("Nowe hasło to: %s \n Należy zmienić je po zalogowaniu", newPassword)));
		log.info(format("Użytkownik o emailu %s wymusił reset hasła.", user.getEmail()));
		return "Nowe hasło zostało wysłane";
	}

	public VerificationToken getTokenForUser(User user) {
		return verificationTokenRepository.findByUser(user);
	}

	public void removeToken(VerificationToken verificationToken) {
		verificationTokenRepository.delete(verificationToken);
	}

	public String logUser() {
		UserDetailsImpl userDetails =
				(UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		return userDetails.getUsername();
	}

	public void changePassword(User user, String password) {
		user.setPassword(encoder.encode(password));
	}
}
