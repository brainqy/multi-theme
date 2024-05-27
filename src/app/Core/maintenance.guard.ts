import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(): boolean {
    // Check if maintenance mode is active, e.g., from a service or a variable
    const maintenanceMode = true;

    if (maintenanceMode) {
      this.router.navigate(['/maintenance']);
      return false;
    }
    return true;
  }
}
