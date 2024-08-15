import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      // User is logged in, redirect based on role
      if (currentUser.role === 'CHEF') {
        this.router.navigate(['/manager']);
      } else if (currentUser.role === 'USER') {
        this.router.navigate(['/member']);
      }
      return false;
    }
    // Allow access to guest routes if not authenticated
    return true;
  }
}