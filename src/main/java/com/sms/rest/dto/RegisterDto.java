package com.sms.rest.dto;

import java.util.ArrayList;
import java.util.List;

import javax.validation.constraints.Pattern;

public class RegisterDto {

	@Pattern(regexp = "^[a-zA-Z]*$", message = "User name can only contains characters")
	private String username;
	@Pattern(regexp = "^[a-zA-Z0-9]*$", message = "Password can only alphanumeric characters")
	private String password;

	private List<String> roles = new ArrayList<>();

	public RegisterDto() {
		// TODO Auto-generated constructor stub
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<String> getRoles() {
		return roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
		builder.append("RegisterDto [username=");
		builder.append(username);
		builder.append(", password=");
		builder.append(password);
		builder.append("]");
		return builder.toString();
	}

}
