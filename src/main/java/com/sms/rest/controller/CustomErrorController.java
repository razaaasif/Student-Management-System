package com.sms.rest.controller;

import javax.servlet.RequestDispatcher;
import javax.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.TreeMap;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class CustomErrorController implements ErrorController {

	@GetMapping("/error")
	public ResponseEntity<Object> handleError(HttpServletRequest request) {
		HttpStatus httpStatus = HttpStatus.NOT_FOUND;

		String errorMessage = "Resource not found";
		String wrongUrl = (String) request.getAttribute(RequestDispatcher.ERROR_REQUEST_URI);

		// Create a JSON response body with the error message, status, and wrong URL
		Map<String, Object> response = new TreeMap<>();
		response.put("message", errorMessage);
		response.put("status", httpStatus.value());
		response.put("path", wrongUrl);
		 

		return new ResponseEntity<>(response, httpStatus);
	}

	public String getErrorPath() {
		return "/error";
	}
}
