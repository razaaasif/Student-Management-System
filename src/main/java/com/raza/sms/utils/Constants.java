package com.raza.sms.utils;

public class Constants {

	public enum BRANCH {
		COMPUTER_SCIECNE_ENGINEERING("CS"), MECHANICAL_ENGINEERING("ME"), CHEMICAL_ENGINEERING("CHE"),
		ELECTRICAL_ENGINEERING("EE");

		private String value;

		BRANCH(String string) {
			this.value = string;
		}

		public String getValue() {
			return this.value;
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
}
