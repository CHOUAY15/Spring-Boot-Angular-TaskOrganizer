import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const expectedRole = route.data['expectedRole'];
    const currentUser = this.authService.getCurrentUser();

    if (currentUser && currentUser.role === expectedRole) {
      return true;
    }

    // Redirect to appropriate route based on role
    if (currentUser) {
      switch (currentUser.role) {
        case 'CHEF':
          this.router.navigate(['/manager']);
          break;
        case 'USER':
          this.router.navigate(['/member']);
          break;
        case 'ADMIN':
          this.router.navigate(['/admin']);
          break;
        default:
          this.router.navigate(['/guest/login']);
      }
    } else {
      this.router.navigate(['/guest/login']);
    }
    return false;
  }
}