package com.raza.sms.config;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.raza.sms.dao.interfaces.UserRepository;
import com.raza.sms.entity.Role;
import com.raza.sms.entity.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	private UserRepository userRepository;

	public CustomUserDetailsService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = this.userRepository.findByUsername(username)
				.orElseThrow(() -> new UsernameNotFoundException("USername " + username + " is not found"));
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
				this.grantedAuthoritiedFromRoles(user.getRoles()));
	}

	private Collection<? extends GrantedAuthority> grantedAuthoritiedFromRoles(List<Role> roles) {

		return roles.stream().map(role -> new SimpleGrantedAuthority("ROLE_"+role.getName())).collect((Collectors.toList()));
	}

}
