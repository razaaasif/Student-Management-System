package com.sms.dao.interfaces;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sms.entity.Student;

public interface StudentDAO extends JpaRepository<Student, String> {
}
