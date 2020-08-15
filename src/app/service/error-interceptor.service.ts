import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor(
    private toastrService: ToastrService
  ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      retry(1),
      catchError((err) => {
        let message = ''
        if(err.status === 401){
          message = 'Unauthorized'
          
        }
        else if(err.status === 404){
          message = 'Not Found'
          
        }
        else if(err.status === 400){
          message = 'Bad Request'
        }
        else {
          message = 'Unexpected Error'
        }
        this.toastrService.error(message)
        return throwError(err)
      })
    )
  }
}
