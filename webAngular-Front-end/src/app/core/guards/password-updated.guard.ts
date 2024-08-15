import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { Observable, map } from "rxjs";
import { AuthenticationService } from "../services/authentication.service";

@Injectable({
    providedIn: 'root'
  })
  export class PasswordUpdateGuard implements CanActivate {
    constructor(private authService: AuthenticationService, private router: Router) {}
  
    canActivate(): Observable<boolean> {
      return this.authService.checkPasswordStatus().pipe(
        map(status => {
          if (!status) {
            this.router.navigate(['/update-password']);
            return false;
          }
          return true;
        })
      );
    }
  }