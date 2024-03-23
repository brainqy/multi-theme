import {Injectable} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {EncryptDecryptService} from "../services/encrypt-decrypt.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService,
              private encDecService: EncryptDecryptService) {
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    //add the jwt token (LocalStorage) request
    const token = this.authService.getToken();
    if (token != undefined) {
      const decryptedToken = this.encDecService.getDecryption(token);
      const authRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${decryptedToken}`
        },
      });
      return next.handle(authRequest);
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
