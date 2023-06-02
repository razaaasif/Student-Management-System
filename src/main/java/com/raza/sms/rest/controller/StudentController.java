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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.raza.sms.dao.interfaces.StudentDAO;
import com.raza.sms.entity.Student;
import com.raza.sms.rest.dto.StudentSaveJson;
import com.raza.sms.rest.response.MessageResponse;
import com.raza.sms.utils.Constants.BRANCH;
import com.raza.sms.utils.Constants.MessageResponseType;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class StudentController {
	private List<Student> students;
	private StudentDAO studentDAO;

	public StudentController(StudentDAO studentDAO) {
		this.studentDAO = studentDAO;
	}

	@PostConstruct()
	@Transactional
	public void loadStudent() {
		this.students = new ArrayList<>();
		students.add(
				new Student("Aasif", "Raza", "aasifraza@gmail.com", BRANCH.COMPUTER_SCIECNE_ENGINEERING.getValue()));
		students.add(new Student("Aasif", "Raza", "aasifraza@gmail.com", BRANCH.ELECTRICAL_ENGINEERING.getValue()));
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
		if (st.isPresent())
			this.studentDAO.delete(st.get());
		return new Message(st.isPresent() ? st.toString() : null, null, false);
	}

	@PutMapping("/students")
	public MessageResponse persist(@RequestBody StudentSaveJson toSave) {
		StudentSaveJson save = new StudentSaveJson(toSave);

		try {
			if (null != save.getDeleteData() && save.getDeleteData().size() > 0) {
				this.studentDAO.deleteAllByIdInBatch(save.getDeleteData());
			}

			if (null != save.getSaveData() && save.getSaveData().size() > 0) {
				this.studentDAO.saveAll(save.getSaveData());
			}
			return new MessageResponse(MessageResponseType.GENERIC_SUCCESS, "Students Saved.");
		} catch (Exception e) {
			e.printStackTrace();
			return new MessageResponse(MessageResponseType.GENERIC_ERROR, e.getMessage());
		}

	}
}
