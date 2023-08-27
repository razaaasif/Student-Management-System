import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/model/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLogin: any;
  constructor(public userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.isUserLoggedIn.subscribe(
      (login) => (this.isLogin = login)
    );
  }

  logout(): void {
    this.userService.removeUser();
    this.router.navigate(['/login']);
  }
}
