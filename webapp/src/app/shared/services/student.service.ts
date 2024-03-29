import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Student,
  StudentModel,
  StudentPersistModel,
} from '../model/student.component.model';
import { map } from 'rxjs/operators';
import { MesssageResponse } from '../model/messsage-response.model';
import { APP_URL } from '../../app-url';
import { KeyValueModel } from '../model/name-value.model';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}

  getStudents(): Observable<Array<StudentModel>> {
    return this.http
      .get<Array<Student>>(APP_URL.STUDENTS)
      .pipe(map((response: any) => response._embedded.students));
  }

  getBranchs(): Observable<Array<KeyValueModel>> {
    return this.http.get<Array<KeyValueModel>>(
    APP_URL.BRANCHS
    );
  }

  persistStudents(toSave: StudentPersistModel): Observable<MesssageResponse> {
    return this.http.put<MesssageResponse>(
    APP_URL.SAVE_STUDENTS,
      toSave
    );
  }

  putNewStudent(student: Student): Observable<StudentModel> {
    console.log('putNewStudent : ' + JSON.stringify(student));
    return this.http.post<StudentModel>(
    APP_URL.NEW_STUDENT,
      student
    );
  }

  updateStudent(student: Student): Observable<StudentModel> {
    console.log('updateStudent : ' + JSON.stringify(student));
    return this.http.put<StudentModel>(
     APP_URL.NEW_STUDENT,
      student
    );
  }
}
