package com.yerbnijse.webservice.repository;

import com.yerbnijse.webservice.model.Portal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PortalRepository extends JpaRepository<Portal, Integer> {

  Portal findByCode(String name);
}
