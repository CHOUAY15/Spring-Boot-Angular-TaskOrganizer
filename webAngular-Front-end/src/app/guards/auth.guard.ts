// src/app/guards/auth.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      // User is logged in, redirect based on role
      if (currentUser.role === 'CHEF' && !state.url.startsWith('/chef')) {
        this.router.navigate(['/chef']);
        return false;
      } else if (currentUser.role === 'USER' && !state.url.startsWith('/employee')) {
        this.router.navigate(['/employee/home']);
        return false;
      }
      return true;
    }

    // Not logged in, redirect to login page
    this.router.navigate(['/guest/login']);
    return false;
  }
}