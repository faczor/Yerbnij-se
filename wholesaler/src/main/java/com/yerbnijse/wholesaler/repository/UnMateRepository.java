package com.yerbnijse.wholesaler.repository;

import com.yerbnijse.wholesaler.model.UnMate;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UnMateRepository extends MongoRepository<UnMate, String> {
  List<UnMate> findAllByIsVisibleIsTrue();
}
