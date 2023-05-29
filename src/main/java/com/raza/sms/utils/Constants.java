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
}
