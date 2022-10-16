import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpinnerServiceService } from '../services/spinner-service.service';
import { delay, finalize } from 'rxjs/operators';

@Injectable()
export class SpinnerInterceptorInterceptor implements HttpInterceptor {

  constructor(private spinnerService:SpinnerServiceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.spinnerSum()
    return next.handle(request).pipe(
      delay(1000),
      finalize(()=>{
        this.spinnerService.spinnerDec()
      })
    )
  }
}
