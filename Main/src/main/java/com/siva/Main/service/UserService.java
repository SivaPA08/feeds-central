package com.siva.Main.service;

import org.springframework.stereotype.Service;

import com.siva.Main.mongo.MongoRepo;
import com.siva.Main.mongo.MongoUtil;

@Service
public class UserService {

	private final MongoRepo mongoRepo;

	// injection
	public UserService(MongoRepo mongoRepo) {

		this.mongoRepo = mongoRepo;
	}

	// from here userservice starts
	public boolean userExsists(String username) {
		return mongoRepo.existsByUsername(username);
	}

	public boolean saveRegisteredUser(String username, String email, String password) {
		try {
			MongoUtil user = new MongoUtil.Builder().username(username).email(email).password(password).build();
			mongoRepo.save(user);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	public boolean getLoginUserInfo(String email, String password) {
		MongoUtil user = mongoRepo.findByEmail(email);
		if (user == null) {
			return false;
		}
		if (user.getPassword().equals(password)) {
			return true;
		}
		return false;
	}

}
