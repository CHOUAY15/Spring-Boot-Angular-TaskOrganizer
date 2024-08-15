// src/app/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      // User is logged in, redirect based on role
      if (currentUser.role === 'CHEF' && !state.url.startsWith('/manager')) {
        this.router.navigate(['/manager']);
        return false;
      } else if (currentUser.role === 'USER' && !state.url.startsWith('/member')) {
        this.router.navigate(['/member']);
        return false;
      } else if (currentUser.role === 'ADMIN' && !state.url.startsWith('/admin')) {
        this.router.navigate(['/admin']);
        return false;
      }
      return true;
    }

    // Not logged in, redirect to login page
    this.router.navigate(['/guest/login']);
    return false;
  }
}
