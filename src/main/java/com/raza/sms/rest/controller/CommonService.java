package com.raza.sms.rest.controller;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raza.sms.rest.json.KeyValueJson;
import com.raza.sms.utils.Constants.BRANCH;

@RestController
@RequestMapping("/api/commons")
@CrossOrigin("*")
public class CommonService {

	@GetMapping("/branch")
	public List<KeyValueJson> loadBranchs() {

		List<KeyValueJson> list = Stream.of(BRANCH.values()).map(t -> new KeyValueJson(t.getName(), t.getValue()))
				.collect(Collectors.toList());
		System.out.println("BRANCH : " + list);
		return list;
	}
}
