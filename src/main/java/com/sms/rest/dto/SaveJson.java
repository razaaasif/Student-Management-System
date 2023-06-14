package com.sms.rest.dto;

import java.util.ArrayList;
import java.util.List;

public class SaveJson<T , ID> {

	private List<T> saveData;

	private List<ID> deleteData;

	public SaveJson() {

	}

	public SaveJson(SaveJson<T, ID> toSave) {
		if (null != toSave) {
			this.saveData = toSave.getSaveData();
			this.deleteData = toSave.getDeleteData();
		} else {
			this.saveData = new ArrayList<>();
			this.deleteData = new ArrayList<>();
		}

	}

	public List<T> getSaveData() {
		return saveData;
	}

	public void setSaveData(List<T> saveData) {
		this.saveData = saveData;
	}

	public List<ID> getDeleteData() {
		return deleteData;
	}

	public void setDeleteData(List<ID> deleteData) {
		this.deleteData = deleteData;
	}

}
