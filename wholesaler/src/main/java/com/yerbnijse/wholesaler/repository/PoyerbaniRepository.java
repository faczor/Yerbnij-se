package com.yerbnijse.wholesaler.repository;

import com.yerbnijse.wholesaler.model.Poyerbani;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PoyerbaniRepository extends MongoRepository<Poyerbani, String> {
  List<Poyerbani> findAllByIsVisibleIsTrue();
}
