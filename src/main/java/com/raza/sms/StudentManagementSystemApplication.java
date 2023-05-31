package com.raza.sms;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.PostConstruct;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.Transactional;
import com.raza.sms.dao.interfaces.StudentDAO;
import com.raza.sms.entity.Student;
import com.raza.sms.utils.Constants.BRANCH;

@SpringBootApplication
public class StudentManagementSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentManagementSystemApplication.class, args);
	}
	
	private List<Student> students;
	private StudentDAO studentDAO ;
	
	public StudentManagementSystemApplication(StudentDAO studentDAO) {
		this.studentDAO = studentDAO;
	}


	@PostConstruct()
	@Transactional
	public void loadStudent() {
		this.students = new ArrayList<>();
		students.add(new Student("Aasif", "Raza" , "aasifraza@gmail.com", BRANCH.COMPUTER_SCIECNE_ENGINEERING.getValue()));
		students.add(new Student("Kashif", "Raza" , "aasifraza@gmail.com", BRANCH.ELECTRICAL_ENGINEERING.getValue()));
		this.studentDAO.saveAll(this.students);
	}
	
	 @Controller
	    public static class HomeController {
	        @RequestMapping("/")
	        public String index() {
	            return "index.html";
	        }
	    }

}
