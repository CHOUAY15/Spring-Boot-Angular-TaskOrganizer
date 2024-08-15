// src/app/guards/root-redirect.guard.ts

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RootRedirectGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      if (currentUser.role === 'USER') {
        this.router.navigate(['/member']);
      } else if (currentUser.role === 'CHEF') {
        this.router.navigate(['/manager']);
      } else {
        this.router.navigate(['/guest']);
      }
    } else {
      this.router.navigate(['/guest']);
    }
    return false;
  }
}