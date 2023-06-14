import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { APP_URL } from '../../app-url';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentModel, Student } from '../model/student.component.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}
  public login(): Observable<any> {
    return this.http.get(environment.appUrl + '/students');
  }
}
