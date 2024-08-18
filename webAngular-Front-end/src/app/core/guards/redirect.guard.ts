import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RootRedirectGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      const role = this.authService.getUserRole();
      switch (role) {
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
          this.router.navigate(['/guest']);
      }
    } else {
      this.router.navigate(['/guest']);
    }
    return false;
  }
}