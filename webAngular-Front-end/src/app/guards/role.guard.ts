import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && currentUser.role === expectedRole) {
      return true;
    }

    // Redirect to appropriate route based on role
    if (currentUser) {
      if (currentUser.role === 'CHEF') {
        this.router.navigate(['/chef']);
      } else if (currentUser.role === 'USER') {
        this.router.navigate(['/acceuil']);
      }
    } else {
      this.router.navigate(['/login']);
    }
    return false;
  }
}