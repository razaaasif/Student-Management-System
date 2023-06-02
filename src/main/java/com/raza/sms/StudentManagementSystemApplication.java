package com.raza.sms;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import com.raza.sms.dao.interfaces.StudentDAO;
import com.raza.sms.entity.Student;
import com.raza.sms.utils.Constants.BRANCH;

@SpringBootApplication
public class StudentManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentManagementSystemApplication.class, args);
	}

	public StudentManagementSystemApplication(StudentDAO studentDAO) {
	}

	@Controller
	public static class HomeController {
		@GetMapping("/")
		public String index() {
			return "index.html";
		}
	}

}
