package com.raza.sms.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table
public class Student {
	@Id
	@GenericGenerator(name = "student_id_generator", strategy = "com.raza.sms.utils.StudentIdGenerator")
	@GeneratedValue(generator = "student_id_generator")
	private String rollNumber;
	private String firstName;
	private String lastName;
	private String email;
	private String branch;

	public Student() {
	}

	public Student(String firstName, String lastName, String email , String branch) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.branch = branch;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	

	public String getRollNumber() {
		return rollNumber;
	}

	public void setRollNumber(String rollNumber) {
		this.rollNumber = rollNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	
	public String getBranch() {
		return branch;
	}

	public void setBranch(String branch) {
		this.branch = branch;
	}

	@Override
	public String toString() {
		return "Student [rollNumber=" + rollNumber + ", firstName=" + firstName + ", lastName=" + lastName + ", email="
				+ email + ", branch=" + branch + "]";
	}

	
	 
}

