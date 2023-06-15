import { Injectable } from '@angular/core';
import { User } from './user.mode';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public user: User;
  public isUserLoggedIn: Subject<boolean> = new Subject<boolean>();
  public isLoggedIn: boolean = false;
  isSignupRequest: boolean;
  constructor() {
    this.isUserLoggedIn.subscribe((loggedin) => (this.isLoggedIn = loggedin));
    const temp: User = JSON.parse(sessionStorage.getItem('userDetail'));
    console.log('UserService constructor : ' + JSON.stringify(temp));
    this.user = new User();
    if (temp !== null) {
      this.user = new User();

      this.user.username = temp?.username;
      this.user.password = temp?.password;
    }
  }

  setUserPassword(username: string, password: string): void {
    console.log(
      'UserService setUserPassword user : ' + password + ' pass : ' + password
    );

    const tempUser = { username: username, password: password };
    sessionStorage.setItem('userDetail', JSON.stringify(tempUser));

    this.user.username = username;
    this.user.password = password;
  }
  getUsername(): string {
    return this.user.username;
  }
  getPassword(): string {
    return this.user.password;
  }
}
