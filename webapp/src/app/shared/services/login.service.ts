import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { env } from 'process';
import { APP_URL } from '../../app-url';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StudentModel, Student } from '../model/student.component.model';
import { User } from '../model/user.mode';
import { UserService } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  constructor(private http: HttpClient, private userService: UserService) {
  }

  public login(): Observable<any> {
    return this.http.get('/students');
  }

  public signup(user: User): Observable<any> {
    return this.http.post(APP_URL.SIGN_UP, user);
  }

  public isValid(): Observable<boolean> {
    return this.http.post<boolean>('/api/auth/isvalid', this.userService.user);
  }
}
