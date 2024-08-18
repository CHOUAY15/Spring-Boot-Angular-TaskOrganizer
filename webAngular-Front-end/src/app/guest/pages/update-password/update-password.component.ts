import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Observable, map } from 'rxjs';
import { FeedBackComponent } from "../../../shared/components/feed-back/feed-back.component";

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FeedBackComponent],
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  passwordStrength$: Observable<number>;
  userNom:string;
  userPrenom:string;
  showFeedback = false;
  feedbackMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userNom=this.authService.getCurrentUser().person.name;
    this.userPrenom=this.authService.getCurrentUser().person.lastName;

    this.passwordForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    this.passwordStrength$ = this.passwordForm.get('newPassword').valueChanges.pipe(
      map(password => this.checkPasswordStrength(password))
    );
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('newPassword').value === g.get('confirmPassword').value
      ? null : { mismatch: true };
  }

  checkPasswordStrength(password: string): number {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < 8) return 1;
    if (hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChars) return 3;
    return 2;
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      this.authService.updatePassword(this.passwordForm.get('newPassword').value).subscribe(
        (response) => {
          console.log('Password updated successfully');
          this.showFeedbackMessage('Mot de passe bien modifié')
        },
        error => {
          console.error('Failed to update password', error);
          this.showFeedbackMessage('Échec de la mise à jour du mot de passe');
        }
      );
    }
  }
  showFeedbackMessage(message: string) {
    this.feedbackMessage = message;
    this.showFeedback = true;
    setTimeout(() => {
      this.showFeedback = false;
      this.authService.logout();
    }, 3000);
  }

  closeFeedback() {
    this.showFeedback = false;
  }
}