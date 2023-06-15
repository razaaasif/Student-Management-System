import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { SpinnerService } from '../shared/services/spinner.service';
import { Router } from '@angular/router';
import { UserService } from '../shared/model/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public username: string = null;
  public password: string = null;
  constructor(
    private http: LoginService,
    private spinner: SpinnerService,
    private router: Router,
    private userService: UserService
  ) {}
  ngOnDestroy(): void {}

  ngOnInit(): void {}
  public isValid(): boolean {
    return !(
      this.username != null &&
      this.username.length >= 5 &&
      this.password != null &&
      this.password.length > 3
    );
  }
  login(): void {
    this.userService.setUserPassword(this.username, this.password);
    this.spinner.show();
    const resp = this.http.login().subscribe(
      (data) => {
        console.log('data login ' + JSON.stringify(data));
        console.log(this.username + ':' + this.password);
        this.spinner.hide();
        this.userService.isUserLoggedIn = true;
        this.router.navigate(['students']);
      },
      (erro) => {
        console.log('Error -> ' + JSON.stringify(erro));
        this.spinner.hide();
      }
    );
  }
}
