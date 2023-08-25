import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../shared/services/login.service';
import { SpinnerService } from '../shared/services/spinner.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../shared/model/user.model';
import { User } from '../shared/model/user.mode';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public username: string = null;
  public password: string = null;
  public label: string = 'Please enter your username and password';
  usernameabel: string = 'Enter your username';
  public loginLable = 'Login';
  public signUp: boolean = false;
  private sub: Subscription;
  createSuccess: boolean;
  constructor(
    private http: LoginService,
    private spinner: SpinnerService,
    private router: Router,
    private userService: UserService,
    private message: MessageService
  ) {}
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  ngOnInit(): void {}
  public isValid(): boolean {
    return !(
      this.username != null &&
      this.username.length >= 5 &&
      this.password != null &&
      this.password.length >= 5
    );
  }

  public createUser(): void {
    this.reset();
    this.signUp = true;
    this.loginLable = 'Ok';
    this.label = 'Enter your Username and password to sign up.';
    this.usernameabel = 'Enter atleast 5 characters username';
  }
  reset() {
    this.username = null;
    this.password = null;
  }

  showMessage(): void {
    this.message.add({
      summary: 'User created successfully : ' + this.username,
      severity: 'success',
    });
  }
  public signIn(): void {
    this.reset();

    this.signUp = false;
    this.label = 'Enter your Username and password to sign in.';
    this.usernameabel = 'Enter your username';
    this.loginLable = 'Login';
  }
  selectMethod(): void {
    console.log('selectMethod signup ' + JSON.stringify(this.signUp));

    if (this.signUp) {
      this.createUSerInfo();
    } else {
      this.login();
    }
  }
  createUSerInfo(): void {
    this.userService.isSignupRequest = true;
    this.spinner.show();
    this.sub = this.http.signup(this.user()).subscribe(
      (data) => {
        this.showMessage();
        console.log(this.username + ':' + this.password);
        console.log('createUSerInfo signup ' + JSON.stringify(data));
        this.createSuccess = true;
        this.signUp = false;
        this.userService.isSignupRequest = false;
        this.signIn();
        this.spinner.hide();
      },
      (erro) => {
        console.log('createUSerInfo Err -> ' + JSON.stringify(erro));
        this.spinner.hide();
      }
    );
  }
  user(): User {
    return { username: this.username, password: this.password };
  }

  login(): void {
    console.log('login user ' + this.username + ', pass ' + this.password);
    this.userService.setUserPassword(this.username, this.password);
    this.spinner.show();
    const resp = this.http.login().subscribe(
      (data) => {
        console.log('data login ' + JSON.stringify(data));
        console.log(this.username + ':' + this.password);
        this.spinner.hide();
        this.showMessage();
        this.userService.isUserLoggedIn.next(true);
        console.log('data login ' + JSON.stringify(data));
        this.router.navigate(['/students']);
      },
      (erro) => {
        console.log('Error -> ' + JSON.stringify(erro));
        if (erro['status'] === 404) {
          this.userService.isUserLoggedIn.next(false);
          this.router.navigate(['/login']);
        }
        this.spinner.hide();
      }
    );
  }
}
