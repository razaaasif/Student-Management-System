import { Component, OnInit } from '@angular/core';
import { LoginService } from './shared/services/login.service';
import { Router } from '@angular/router';
import { UserService } from './shared/model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit{
  constructor(private loginService: LoginService , private router: Router, private userService:UserService) { }
  ngOnInit(): void {
    this.loginService.isValid().subscribe((data) => {
      console.log('isValid -> ' + data);
      if (data) {
        this.userService.isUserLoggedIn.next(data);
        this.router.navigateByUrl('/students');
      } else {
        this.userService.removeUser();
        this.router.navigateByUrl('/login');
      }

    })
  }

}
