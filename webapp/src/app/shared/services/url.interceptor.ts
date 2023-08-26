import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ErrorHandlingService } from './error-handler.service';

@Injectable({
  providedIn:'root'
})
export class UrlInterceptor implements HttpInterceptor {
  constructor(
    private errorHandlingService : ErrorHandlingService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedReq = req.clone({
      url: !environment.production ? environment.appUrl + req.url : req.url,
    });
    return next.handle(modifiedReq).pipe(
        catchError((errorResponse: HttpErrorResponse) => {
          this.errorHandlingService.handleHttpError(errorResponse);
          return throwError(errorResponse);
        })
      );;
  }
}
