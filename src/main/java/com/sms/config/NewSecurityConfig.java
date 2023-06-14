package com.sms.config;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.sms.utils.Constants.ROLES;

@Configuration
public class NewSecurityConfig {

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(withDefaults -> withDefaults.disable())
				.authorizeHttpRequests(requests -> requests.antMatchers("/api/auth/**").permitAll()
						.antMatchers(HttpMethod.GET, "/students").hasRole(ROLES.STUDENT.value())
						.antMatchers(HttpMethod.GET, "/students/**").hasRole(ROLES.STUDENT.value())
						.antMatchers(HttpMethod.POST, "/students").hasRole(ROLES.TEACHER.value())
						.antMatchers("/admin/**").hasRole(ROLES.ADMIN.value()).anyRequest().authenticated())
				.httpBasic(withDefaults()).formLogin(withDefaults());
		return http.build();
	}

	@Bean
	DaoAuthenticationProvider authenticationProvider(CustomUserDetailsService userService) {
		DaoAuthenticationProvider auth = new DaoAuthenticationProvider();
		auth.setUserDetailsService(userService); // set the custom user details service
		auth.setPasswordEncoder(passwordEncoder()); // set the password encoder - bcrypt
		return auth;
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
