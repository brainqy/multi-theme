import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../application_constant/environment";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {JwtService} from "./jwt.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private router: Router,
              private authService: AuthService,
              private jwtService: JwtService) {
  }

  // Registering new users to the system
  register(user: any): Observable<any> {
    return this.http.post(environment.baseUrl + environment.signupUrl,
      JSON.stringify(user),
      {
        headers:
          {'Content-Type': 'application/json'}
      });
  }

  // validating user credentials
  login(user: any): Observable<any> {
    return this.http.post(environment.baseUrl + environment.loginUrl,
      JSON.stringify(user),
      {
        headers:
          {'Content-Type': 'application/json'}
      });
  }

  navigateByRoles() {
    const token = this.authService.getToken();
    if (token) {
      // Check if route is restricted by role
      const role = this.jwtService.getRoleFromToken(token);
      if (role === 'ROLE_TECHNICAL_MANAGER') {
        this.router.navigate(['tm-dashboard']);
      } else if (role === 'ROLE_REQUESTER') {
        this.router.navigate(['requester-home']);
      } else if (role === 'ROLE_TRAINER') {
        this.router.navigate(['mn-home']) ;
      }
      else {
        this.router.navigate(['']);
      }

    }
  }
}
