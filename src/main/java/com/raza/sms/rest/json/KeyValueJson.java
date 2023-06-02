package com.raza.sms.rest.json;

import com.fasterxml.jackson.annotation.JsonProperty;

public class KeyValueJson {
	@JsonProperty
	private String key;
	@JsonProperty
	private String value;

	public KeyValueJson() {
		// TODO Auto-generated constructor stub
	}

	public KeyValueJson(String key, String value) {
		this.key = key;
		this.value = value;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	@Override
	public String toString() {
		return "KeyValueJson [key=" + key + ", value=" + value + "]";
	}

}
