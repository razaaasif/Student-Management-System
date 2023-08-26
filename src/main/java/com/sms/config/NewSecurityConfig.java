package com.sms.config;

import static org.springframework.security.config.Customizer.withDefaults;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.LoginUrlAuthenticationEntryPoint;

import java.util.Arrays;

import javax.servlet.http.HttpServletRequest;

import com.sms.utils.Constants.ROLES;
import org.springframework.web.cors.CorsConfiguration;

@Configuration
public class NewSecurityConfig {

	@Bean
	WebSecurityCustomizer webSecurityCustomizer() {
		return (web) -> web.ignoring().antMatchers("/");
	}

	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http.csrf(withDefaults -> withDefaults.disable())
				.cors(cors -> cors.configurationSource(request -> this.getCorsConfiguration(request)))
				.authorizeHttpRequests(
						requests -> requests.antMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
								.antMatchers(HttpMethod.POST, "/api/auth/register").permitAll()
								.antMatchers(HttpMethod.GET, "/students").hasRole(ROLES.STUDENT.value())
								.antMatchers(HttpMethod.GET, "/students/**").hasRole(ROLES.STUDENT.value())
								.antMatchers(HttpMethod.POST, "/students").hasRole(ROLES.TEACHER.value())
								.antMatchers("/admin/**").hasRole(ROLES.ADMIN.value()))
				.httpBasic(withDefaults())
				.formLogin(login -> login.loginPage("/login").defaultSuccessUrl("/", false).failureForwardUrl("/"))

				.exceptionHandling(handling -> handling.authenticationEntryPoint(authenticationEntryPoint())); // Set
																												// custom
																												// AuthenticationEntryPoint
		return http.build();
	}

	@Bean
	AuthenticationEntryPoint authenticationEntryPoint() {
		return new LoginUrlAuthenticationEntryPoint("/");
	}

	private CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

		CorsConfiguration corss = new CorsConfiguration();
		corss.setAllowedOrigins(Arrays.asList("*"));
		corss.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		corss.setAllowedHeaders(Arrays.asList("*"));
		return corss;

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
