import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  loginForm: FormGroup;
  authError: string = '';
  isLoading: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authError = '';
      const { email, password } = this.loginForm.value;
      console.log('Attempting login with:', { email, password });
      this.authService.login(email, password)
        .subscribe(
          response => {
            this.isLoading = false;
            console.log('Login successful:', response);
            this.redirectBasedOnRole(response.role);
          },
          (error: HttpErrorResponse) => {
            this.isLoading = false;
            console.error('Login failed:', error);
            console.log('Error status:', error.status);
            console.log('Error message:', error.message);
            console.log('Error details:', error.error);
            
            if (error.status === 0) {
              this.authError = 'Problème de connexion. Veuillez réessayer.';
            } else if (error.status === 401) {
              this.authError = 'Email ou mot de passe incorrect. Veuillez réessayer.';
            } else {
              this.authError = `Une erreur est survenue (${error.status}). Veuillez réessayer plus tard.`;
            }
          }
        );
    }
  }

  redirectBasedOnRole(role: string) {
    switch (role) {
      case 'CHEF':
        this.router.navigate(['/chef']);
        break;
      case 'USER':
        this.router.navigate(['/employee/home']);
        break;
      default:
        this.router.navigate(['/guest']);
    }
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    console.log('Forgot password clicked');
    // Implement forgot password functionality
  }
}