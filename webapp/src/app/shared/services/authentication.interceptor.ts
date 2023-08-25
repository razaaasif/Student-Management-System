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
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { ErrorHandlingService } from './error-handler.service';

@Injectable({
  providedIn: 'root', // or specify a specific module
})
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(
    private useService: UserService,
    private router: Router,
    private errorHandlingService
  : ErrorHandlingService) {}

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
        url: !environment.production ? environment.appUrl + req.url : req.url,
      });
      console.log('URL req -> ' + req.url);
      console.log('URL newReq -> ' + newReq.url);

      return next.handle(newReq).pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          this.errorHandlingService.handleHttpError(errorResponse);
          return throwError(errorResponse);
        })
      );
    }

    this.router.navigate(['/login']);
    return next.handle(req);
  }
}
