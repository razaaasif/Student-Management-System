import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  Student,
  StudentModel,
  StudentPersistModel,
} from '../model/student.component.model';
import { map } from 'rxjs/operators';
import { Message } from 'primeng/api';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}
  readonly url = environment.appUrl + '/students';
  getStudents(): Observable<Array<StudentModel>> {
    // return of([
    //   {
    //     rollNumber: 'CS-17-01',
    //     firstName: 'Aasif',
    //     lastName: 'Raza',
    //     email: 'aasifraza@gamil.com',
    //   },
    // ]);
    return this.http
      .get<Array<Student>>(this.url)
      .pipe(map((response: any) => response._embedded.students));
  }

  persistStudents(toSave: StudentPersistModel): Observable<any> {
    return this.http.put<any>(environment.appUrl + '/api/students', toSave);
  }
}
