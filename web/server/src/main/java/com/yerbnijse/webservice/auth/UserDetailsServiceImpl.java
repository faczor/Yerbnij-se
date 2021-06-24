package com.yerbnijse.webservice.auth;

import com.yerbnijse.webservice.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		return UserDetailsImpl.from(userRepository.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("User not found in userDetailsService")));
	}
}
