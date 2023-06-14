package com.sms.rest.response;

import com.sms.utils.Constants.MessageResponseType;

public class MessageResponse {
	private MessageResponseType messageType;
	private String message;
	public MessageResponse(MessageResponseType messageType, String message) {
		super();
		this.messageType = messageType;
		this.message = message;
	}
	/**
	 * @return the messageType
	 */
	public MessageResponseType getMessageType() {
		return messageType;
	}
	/**
	 * @param messageType the messageType to set
	 */
	public void setMessageType(MessageResponseType messageType) {
		this.messageType = messageType;
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
