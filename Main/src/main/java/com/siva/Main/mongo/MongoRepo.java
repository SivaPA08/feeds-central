package com.siva.Main.mongo;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface MongoRepo extends MongoRepository<MongoUtil, String> {
	boolean existsByUsername(String username);

	MongoUtil findByEmail(String email);

}
