package com.sms.rest.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import javax.validation.ConstraintViolation;
import javax.validation.ConstraintViolationException;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

	@ExceptionHandler(ConstraintViolationException.class)
	public ResponseEntity<Object> handleValidationException(ConstraintViolationException ex) {
		Map<String, Object> errorResponse = new HashMap<>();

		LocalDateTime timestamp = LocalDateTime.now();
		errorResponse.put("timestamp", timestamp);

		Map<String, String> errors = new HashMap<>();

		for (ConstraintViolation<?> violation : ex.getConstraintViolations()) {
			String field = violation.getPropertyPath().toString();
			String errorMessage = violation.getMessage();
			errors.put(field, errorMessage);
		}

		errorResponse.put("errors", errors);

		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
	}
}
