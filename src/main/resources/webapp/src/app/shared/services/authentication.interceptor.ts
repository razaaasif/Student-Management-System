import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root', // or specify a specific module
})
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private useService: UserService, private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(
      'Interceptor : ' +
        this.useService.getUsername() +
        ', ' +
        this.useService.getPassword()
    );
    if (this.useService.getUsername() && this.useService.getPassword()) {
      const newReq = req.clone({
        setHeaders: {
          Authorization:
            'Basic ' +
            window.btoa(
              this.useService.getUsername() +
                ':' +
                this.useService.getPassword()
            ),
        },
      });
      return next.handle(newReq);
    }
    this.router.navigate(['/login']);
    return next.handle(req);
  }
}
