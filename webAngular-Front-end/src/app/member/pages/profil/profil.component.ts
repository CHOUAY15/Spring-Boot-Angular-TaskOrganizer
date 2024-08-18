import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Person } from 'src/app/shared/models/person';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.scss'
})
export class ProfilComponent implements OnInit {
  profileForm: FormGroup;
  isEditing = false;
  currentProfile: Person;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.initForm();
    this.loadProfileData();
  }

  initForm() {
    this.profileForm = this.fb.group({
      name: [{value: '', disabled: true}],
      lastName: [{value: '', disabled: true}],
      age: ['', [Validators.required, Validators.min(18)]],
      telephone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{10,14}$/)]],
      email: [{value: '', disabled: true}],
      password: ['', [Validators.required, Validators.minLength(8)]],
      adresse: ['', [Validators.required]],
      avatar: [''],
      gender: [{value: '', disabled: true}],
      cin: [{value: '', disabled: true}]
    });
  }

  loadProfileData() {

     
        this.currentProfile = this.authService.getCurrentUser().person
        this.profileForm.patchValue(this.authService.getCurrentUser().person);
    
  }

  onSubmit() {
    // if (this.profileForm.valid) {
    //   const updatedProfile = {...this.currentProfile, ...this.profileForm.value};
    //   this.authService.updateUserProfile(updatedProfile).subscribe(
    //     (response: Person) => {
    //       this.currentProfile = response;
    //       this.isEditing = false;
    //       // Show success message
    //     },
    //     error => {
    //       console.error('Error updating profile', error);
    //       // Handle error (show message to user)
    //     }
    //   );
    // }
  }

  toggleEdit() {
    if (this.isEditing) {
      // If canceling edit, reset form to current profile data
      this.profileForm.patchValue(this.currentProfile);
    }
    this.isEditing = !this.isEditing;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Handle file upload logic here
    }
  }
}