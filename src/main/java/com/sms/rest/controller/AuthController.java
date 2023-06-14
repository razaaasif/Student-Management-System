package com.sms.rest.controller;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.PostConstruct;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sms.dao.interfaces.RoleRepository;
import com.sms.dao.interfaces.UserRepository;
import com.sms.entity.Role;
import com.sms.entity.User;
import com.sms.rest.dto.RegisterDto;
import com.sms.utils.Constants.ROLES;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private UserRepository userRepository;
	private RoleRepository roleRepository;

	private PasswordEncoder passwordEncoder;

	public AuthController(UserRepository userRepository, RoleRepository roleRepository,
			PasswordEncoder passwordEncoder) {
		this.userRepository = userRepository;
		this.roleRepository = roleRepository;
		this.passwordEncoder = passwordEncoder;
	}

	@PostConstruct
	public void createRoles() {
		roleRepository.save(new Role(ROLES.STUDENT.value(), Long.valueOf(1)));
		roleRepository.save(new Role(ROLES.TEACHER.value(), Long.valueOf(2)));
		roleRepository.save(new Role(ROLES.ADMIN.value(), Long.valueOf(3)));
	}

	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody RegisterDto registerDto) {
		if (userRepository.existsByUsername(registerDto.getUsername())) {
			return new ResponseEntity<>("Username is taken ", HttpStatus.BAD_REQUEST);
		}

		User user = new User(registerDto.getUsername(), passwordEncoder.encode(registerDto.getPassword()));
		List<Role> roles = new ArrayList<>();
		roles.addAll(roleRepository.findAll());

		user.setRoles(roles);
//		Optional<Role> roles = roleRepository.findByName(ROLES.TEACHER.value());
//		if (roles.isPresent()) {
//			user.setRoles(Collections.singletonList(roles.get()));
//		}
		userRepository.save(user);

		return new ResponseEntity<>("User regirsterd Successfully", HttpStatus.OK);
	}

}
