package com.raza.sms.dao.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.raza.sms.entity.Student;

public interface StudentDAO extends JpaRepository<Student, String> {
	 void deleteAllByIdInBatch(Iterable<String> ids);
}
