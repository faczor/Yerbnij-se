package com.yerbnijse.wholesaler.repository;

import com.yerbnijse.wholesaler.model.UserAction;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserActionRepository extends MongoRepository<UserAction, String> {}
