package com.raza.sms.rest.dto;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.raza.sms.entity.Student;

public class StudentSaveJson {

	private List<Student> saveData;

	private List<String> deleteData;

	public StudentSaveJson() {

	}

	public StudentSaveJson(StudentSaveJson toSave) {
		if (null != toSave) {
			this.saveData = toSave.getSaveData();
			this.deleteData = toSave.getDeleteData();
		} else {
			this.saveData = new ArrayList<>();
			this.deleteData = new ArrayList<>();
		}

	}

	public List<Student> getSaveData() {
		return saveData;
	}

	public void setSaveData(List<Student> saveData) {
		this.saveData = saveData;
	}

	public List<String> getDeleteData() {
		return deleteData;
	}

	public void setDeleteData(List<String> deleteData) {
		this.deleteData = deleteData;
	}

}
