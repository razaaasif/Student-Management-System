import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from '../model/student.component.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  constructor(private http: HttpClient) {}
  getStudents(): Observable<Array<Student>> {
    // return of([
    //   {
    //     rollNumber: 'CS-17-01',
    //     firstName: 'Aasif',
    //     lastName: 'Raza',
    //     email: 'aasifraza@gamil.com',
    //   },
    // ]);
    return this.http
      .get<Array<Student>>(environment.appUrl + '/students')
      .pipe(map((response: any) => response._embedded.students));
  }
}
