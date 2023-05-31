package com.raza.sms.rest.response;

public class MessageResponse {
	private String message;

	public MessageResponse() {
		// TODO Auto-generated constructor stub
	}

	public MessageResponse(String str) {
		this.message = str;
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
