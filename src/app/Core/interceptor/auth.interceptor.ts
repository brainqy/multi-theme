import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators'; // Replace with your authentication service import
import Swal from 'sweetalert2'; // Import SweetAlert library
import { AuthService } from '../services/auth.service';
import { EncryptDecryptService } from '../services/encrypt-decrypt.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,private encDecService: EncryptDecryptService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    if (token != undefined) {
      const decryptedToken = this.encDecService.getDecryption(token);
      const authRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${decryptedToken}`
        }
      });
      return next.handle(authRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          console.log("error log ",error);
        /*    if (error.status === 401) {
            // Handle 401 Unauthorized error
            Swal.fire("ERROR", "JWT Token has expired", 'error');
            // Optionally, redirect to login page
          //this.authService.removeToken();// Uncomment if you have a logout method
          // window.location.href = '/login'; // Adjust the URL as needed
          } */
          if (error.status === 401 && error.error?.error === 'Jwt Token has expired !!') {
            console.log("JWT Token has expired, handling token refresh or logout.");
            
            Swal.fire('ERROR', 'JWT Token has expired', 'error');
            
            // Remove the token and redirect to the login page
            this.authService.removeToken(); // Ensure you have a removeToken() method in authService
            window.location.href = '/login'; // Redirect to login page
          } else {
            console.log('An unexpected error occurred:', error);
          }
          return throwError(error);
        })
      );
    }
    return next.handle(req);
  }
}

export const authInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
];
