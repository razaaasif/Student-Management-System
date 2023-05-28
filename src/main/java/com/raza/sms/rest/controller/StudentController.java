package com.raza.sms.rest.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.annotation.PostConstruct;

import org.aspectj.bridge.Message;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.raza.sms.dao.interfaces.StudentDAO;
import com.raza.sms.entity.Student;

@CrossOrigin("http://localhost:4200")
@RestController
public class StudentController {
	private List<Student> students;
	private StudentDAO studentDAO ;
	
	public StudentController(StudentDAO studentDAO) {
		this.studentDAO = studentDAO;
	}


	@PostConstruct()
	@Transactional
	public void loadStudent() {
		this.students = new ArrayList<>();
		students.add(new Student("Aasif", "Raza " , "aasifraza@gmail.com"));
		students.add(new Student("Kashif", "Raza ","kasifraza@gmail.com"));
		this.studentDAO.saveAll(this.students);
	}

	@GetMapping("/students")
	public List<Student> getStudents() {
		System.out.println("Students : " + this.studentDAO.findAll());
		return this.studentDAO.findAll();
	}
	
	@DeleteMapping("/students/{studentId}")
	public Message deleteStudents(@PathVariable String studentId) {
		Optional<Student> st = this.studentDAO.findById(studentId);
		if(st.isPresent())this.studentDAO.delete(st.get());
		return new Message(st.isPresent() ? st.toString() : null, null, false);
	}


}
