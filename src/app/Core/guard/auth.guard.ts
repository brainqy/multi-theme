import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "../services/auth.service";
import {JwtService} from "../services/jwt.service";
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private jwtService: JwtService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAuthentication(route, state);
  }

  private checkAuthentication(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    if (this.authService.isAuthenticated()) {
      const token = this.authService.getToken();
      if (token != undefined) {
        //get roles from token
        const role = this.jwtService.getRoleFromToken(token);
        // Check if route is restricted by role
        if (role === 'ROLE_REQUESTER') {
          // Role not authorized, redirect to home page
          return true;
        } else {
          // Not authenticated, redirect to user dashboard or handle accordingly
          Swal.fire('Error', 'Unauthorized', 'error');
          this.router.navigate(['']);
          return false;
        }
      }
      // User details not available, handle accordingly
    } else {
      // Not authenticated, redirect to user dashboard or handle accordingly
      this.router.navigate(['']);
      return false;
    }
  }
}
