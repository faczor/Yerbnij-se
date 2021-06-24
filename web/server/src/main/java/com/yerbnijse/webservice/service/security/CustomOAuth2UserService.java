package com.yerbnijse.webservice.service.security;

import com.yerbnijse.webservice.model.AuthProvider;
import com.yerbnijse.webservice.model.User;
import com.yerbnijse.webservice.model.exception.OAuth2AuthenticationProcessingException;
import com.yerbnijse.webservice.repository.UserRepository;
import com.yerbnijse.webservice.service.security.UserInfo.OAuth2UserInfo;
import com.yerbnijse.webservice.service.security.UserInfo.OAuth2UserInfoFactory;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

	private final UserRepository userRepository;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

		try {
			return processOAuth2User(oAuth2UserRequest, oAuth2User);
		} catch (AuthenticationException ex) {
			throw ex;
		} catch (Exception ex) {
			throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause()); // Triggering
																								// OAuth2AuthenticationFailureHandler
		}
	}

	private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
		OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(
				oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
		if (oAuth2UserInfo.getEmail().isEmpty()) {
			throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
		}

		Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
		if (userOptional.isPresent()) {
			User user = userOptional.get();
			if (!user.getAuthProvider()
					.equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
				throw new OAuth2AuthenticationProcessingException(
						String.format("Account logged from provider %s  with email %s trying to log with provider %s",
								user.getAuthProvider(), user.getEmail(),
								AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId())));
			}
			return UserPrincipal.create(user, oAuth2User.getAttributes());
		}
		return UserPrincipal.create(registerNewUser(oAuth2UserInfo), oAuth2User.getAttributes());
	}

	private User registerNewUser(OAuth2UserInfo oAuth2UserInfo) {
		return userRepository.save(User.fromOauthInfo(oAuth2UserInfo));
	}
}
