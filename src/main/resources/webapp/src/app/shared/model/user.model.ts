import { Injectable } from '@angular/core';
import { User } from './user.mode';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User;
  public isUserLoggedIn: boolean = false;
  constructor() {
    this.user = new User();
    const temp: User = JSON.parse(localStorage.getItem('userDetail'));
    console.log('UserService constructor : ' + JSON.stringify(temp));
    if (temp != null) {
      this.user.username = temp.username;
      this.user.password = temp.password;
    }
  }

  setUserPassword(username: string, password: string): void {
    const tempUser = { username: username, password: password };
    localStorage.setItem('userDetail', JSON.stringify(tempUser));

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
