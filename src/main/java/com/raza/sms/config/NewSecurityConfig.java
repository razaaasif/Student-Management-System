package com.raza.sms.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import com.raza.sms.utils.Constants.ROLES;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class NewSecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(withDefaults -> withDefaults.disable()).authorizeHttpRequests(requests -> requests
                .antMatchers(HttpMethod.GET, "/students").hasRole(ROLES.STUDENT.name())
                .antMatchers(HttpMethod.POST, "/students").hasRole(ROLES.STUDENT.name())
                .antMatchers(HttpMethod.POST, "/students/**").hasRole(ROLES.STUDENT.name()).anyRequest().authenticated())
                .httpBasic(withDefaults()).formLogin(withDefaults());
		return http.build();
	}

	@Bean
	InMemoryUserDetailsManager userDetails() {
		UserDetails student = User.withUsername("student").password("{noop}student").roles(ROLES.STUDENT.name())
				.build();
		UserDetails teacher = User.withUsername("teacher").password("{noop}teacher")
				.roles(ROLES.STUDENT.name(), ROLES.TEACHER.name()).build();
		UserDetails admin = User.withUsername("admin").password("{noop}admin")
				.roles(ROLES.STUDENT.name(), ROLES.TEACHER.name(), ROLES.ADMIN.name()).build();

		return new InMemoryUserDetailsManager(student, teacher, admin);
	}

}
