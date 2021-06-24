package com.yerbnijse.webservice.repository;

import com.yerbnijse.webservice.model.Duplicate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DuplicateRepository extends JpaRepository<Duplicate, Long> {

}
