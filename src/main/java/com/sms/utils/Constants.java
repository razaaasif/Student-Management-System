package com.sms.utils;

public class Constants {

	public enum BRANCH {
		COMPUTER_SCIECNE_ENGINEERING("Computer Science Engineering", "CS"),
		MECHANICAL_ENGINEERING("Mechanical Engineering", "ME"), CHEMICAL_ENGINEERING("Chemical Engineering", "CHE"),
		ELECTRICAL_ENGINEERING("Electrical Engineering", "EE");

		private String name;
		private String value;

		BRANCH(String name, String value) {
			this.name = name;
			this.value = value;

		}

		public String getValue() {
			return this.value;
		}

		public String getName() {
			return this.name;
		}

	}

	public enum MessageResponseType {
		GENERIC_SUCCESS("generic_success"), GENERIC_ERROR("generic_error");

		private String message;

		MessageResponseType(String message) {
			this.message = message;
		}

		/**
		 * @return the message
		 */
		public String getMessage() {
			return message;
		}

		/**
		 * @param message the message to set
		 */
		public void setMessage(String message) {
			this.message = message;
		}

	}

	public enum ROLES {
		STUDENT("STUDENT"), TEACHER("TEACHER"), ADMIN("ADMIN");

		private String role;

		ROLES(String role) {
			this.role = role;
		}

		public String value() {
			return this.role;
		}
	}
}
