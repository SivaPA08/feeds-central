package com.siva.Main.mongo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("user")
public class MongoUtil {
	@Id
	private String id;
	private String username;
	private String email;
	private String password;

	public MongoUtil(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getUsername() {
		return username;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getEmail() {
		return email;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public static class Builder {
		private String username;
		private String email;
		private String password;

		public Builder username(String username) {
			this.username = username;
			return this;
		}

		public Builder email(String email) {
			this.email = email;
			return this;
		}

		public Builder password(String password) {
			this.password = password;
			return this;
		}

		public MongoUtil build() {
			return new MongoUtil(username, email, password);
		}
	}
}
