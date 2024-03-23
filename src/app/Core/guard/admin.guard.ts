import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import Swal from "sweetalert2";
import {AuthService} from "../services/auth.service";
import {JwtService} from "../services/jwt.service";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService,
              private jwtService: JwtService,
              private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkAuthentication(route, state);
  }

  private checkAuthentication(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getToken();
      if (token != undefined) {
        //get roles from token
        const role = this.jwtService.getRoleFromToken(token);
        // Check if route is restricted by role
        if (role === 'ROLE_TECHNICAL_MANAGER' && role != undefined || null) {
          // Role not authorized, redirect to home page
          return true;
        } else {
          // Not authenticated, redirect to user dashboard or handle accordingly
          if (role === 'ROLE_REQUESTER') {
            Swal.fire('Error', 'Unauthorized', 'error');
            this.router.navigate(['requester-home']);
          } else {
            Swal.fire('Error', 'Unauthorized', 'error');
            this.router.navigate(['']);
          }
          return false;
        }
      }
    } else {
      // Not authenticated, redirect to user dashboard or handle accordingly
      this.router.navigate(['']);
      return false;
    }
  }
}
