import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../model/user.model';

@Injectable({
  providedIn: 'root', // or specify a specific module
})
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private useService: UserService) {}

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
    if (
      !this.useService.isSignupRequest &&
      this.useService.getUsername() &&
      this.useService.getPassword()
    ) {
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
      console.log('URL req -> ' + req.url);
      console.log('URL newReq -> ' + newReq.url);

      return next.handle(newReq)
    }
    return next.handle(req);
  }
}
