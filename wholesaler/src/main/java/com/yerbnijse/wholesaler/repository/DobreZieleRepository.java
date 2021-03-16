package com.yerbnijse.wholesaler.repository;

import com.yerbnijse.wholesaler.model.DobreZiele;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DobreZieleRepository extends MongoRepository<DobreZiele, String> {
  List<DobreZiele> findAllByIsVisibleIsTrue();
}
