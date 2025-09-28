package com.siva.Main.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.siva.Main.service.UserService;

@RestController
@RequestMapping("/auth")
public class LoginAndRegister {

	private final UserService userService;

	public LoginAndRegister(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> data) {
		String email = data.get("email");
		String password = data.get("password");
		if (userService.getLoginUserInfo(email, password)) {
			return ResponseEntity.ok(Map.of("message", "Login success"));
		}

		return ResponseEntity.badRequest().body(Map.of("message", "Login unsuccess"));

	}

	@PostMapping("/register")

	public ResponseEntity<Map<String, Object>> register(@RequestBody Map<String, String> data) {
		String username = data.get("username");
		String email = data.get("email");
		String password = data.get("password");
		if (userService.userExsists(username)) {
			return ResponseEntity.badRequest().body(Map.of("message", "User already exists"));
		}
		if (userService.saveRegisteredUser(username, email, password)) {
			return ResponseEntity.ok(Map.of("message", "Register success"));
		}
		return ResponseEntity.badRequest().body(Map.of("message", "Register unsuccess"));
	}
}
