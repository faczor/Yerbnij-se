package com.yerbnijse.webservice.repository;

import com.yerbnijse.webservice.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional<User> findByEmail(String email);

	boolean existsByEmail(String email);

	@Query("SELECT U FROM User U WHERE (:roleId IS NULL OR U.role.id = :roleId) AND "
			+ "(:chIn IS NULL OR (U.name LIKE %:chIn% OR U.surname LIKE %:chIn% OR U.email LIKE %:chIn%))")
	Page<User> findForAdminList(Long roleId, String chIn, Pageable pageable);
}
