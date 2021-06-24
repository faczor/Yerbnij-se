package com.yerbnijse.webservice.service.security;

import static com.yerbnijse.webservice.util.oauth.AuthConstants.OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME;
import static com.yerbnijse.webservice.util.oauth.AuthConstants.REDIRECT_URI_PARAM_COOKIE_NAME;

import com.yerbnijse.webservice.util.oauth.OAuth2CookieUtils;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.client.web.AuthorizationRequestRepository;
import org.springframework.security.oauth2.core.endpoint.OAuth2AuthorizationRequest;

public class CookieOAuth2AuthorizationRequest implements AuthorizationRequestRepository<OAuth2AuthorizationRequest> {

	// @Value("${app.cookie.expire}")
	// private int cookieExpireSeconds;

	@Override
	public OAuth2AuthorizationRequest loadAuthorizationRequest(HttpServletRequest request) {
		return OAuth2CookieUtils.getCookie(request, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME)
				.map(cookie -> OAuth2CookieUtils.deserialize(cookie, OAuth2AuthorizationRequest.class)).orElse(null);
	}

	@Override
	public void saveAuthorizationRequest(OAuth2AuthorizationRequest authorizationRequest, HttpServletRequest request,
			HttpServletResponse response) {
		if (authorizationRequest == null) {
			OAuth2CookieUtils.clearAuthCookies(request, response);
			return;
		}
		OAuth2CookieUtils.addCookie(response, OAUTH2_AUTHORIZATION_REQUEST_COOKIE_NAME,
				OAuth2CookieUtils.serialize(authorizationRequest), 130);
		String redirectUriAfterLogin = request.getParameter(REDIRECT_URI_PARAM_COOKIE_NAME);
		if (!redirectUriAfterLogin.isBlank()) {
			OAuth2CookieUtils.addCookie(response, REDIRECT_URI_PARAM_COOKIE_NAME, redirectUriAfterLogin, 130);
		}
	}

	@Override
	public OAuth2AuthorizationRequest removeAuthorizationRequest(HttpServletRequest request) {
		return this.loadAuthorizationRequest(request);
	}

	public void removeAuthorizationRequestCookies(HttpServletRequest request, HttpServletResponse response) {
		OAuth2CookieUtils.clearAuthCookies(request, response);
	}
}
