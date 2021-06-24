package com.yerbnijse.webservice.repository;

import com.yerbnijse.webservice.model.User;
import com.yerbnijse.webservice.model.VerificationToken;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
	Optional<VerificationToken> findByToken(String token);

  VerificationToken findByUser(User user);
}
