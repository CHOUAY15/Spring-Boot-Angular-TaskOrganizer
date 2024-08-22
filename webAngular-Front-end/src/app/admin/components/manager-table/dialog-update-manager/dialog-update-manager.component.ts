import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule, FormsModule, AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Observable, debounceTime, switchMap, of, first } from 'rxjs';
import { ManagerService } from 'src/app/core/services/manager.service';
import { SectionService } from 'src/app/core/services/section.service';
import { TeamService } from 'src/app/core/services/team.service';
import { FeedBackComponent } from 'src/app/shared/components/feed-back/feed-back.component';
import { Manager } from 'src/app/shared/models/manager';

@Component({
  selector: 'app-dialog-update-manager',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    FeedBackComponent],
  templateUrl: './dialog-update-manager.component.html',
  styleUrl: './dialog-update-manager.component.scss'
})
export class DialogUpdateManagerComponent implements OnInit {
  @Input() manager: Manager;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() managerUpdated = new EventEmitter<{ success: boolean, message: string }>();
 
  genders: string[] = ['Homme', 'Femme'];
  managerForm: FormGroup;
 
  isSubmitting: boolean = false;
  isLoading: boolean = false;
  showFeedback: boolean = false;
  feedbackMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private managerService: ManagerService,
    private sectionService: SectionService,
    private teamService: TeamService
  ) {}

  ngOnInit() {
    this.createForm();
    
    if (this.manager) {
      this.populateForm();
    }
  }

  createForm() {
    this.managerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email], [this.emailExistsValidator()]],
      cin: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{6}$/)], [this.cinExistsValidator()]],
      gender: ['', Validators.required],
     
    });
  }

  populateForm() {
    this.managerForm.patchValue({
      id:this.manager.id,
      name: this.manager.name,
      lastName: this.manager.lastName,
      email: this.manager.email,
      cin: this.manager.cin,
      gender: this.manager.gender,
      
    });
    
  }

  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.managerService.getAllManagers().pipe(
        debounceTime(300),
        switchMap(managers => {
          const emailExists = managers.some(m => m.email.toLowerCase() === control.value.toLowerCase() && m.id !== this.manager.id);
          return of(emailExists ? { emailExists: true } : null);
        }),
        first()
      );
    };
  }

  cinExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.managerService.getAllManagers().pipe(
        debounceTime(300),
        switchMap(managers => {
          const cinExists = managers.some(m => m.cin.toLowerCase() === control.value.toLowerCase() && m.id !== this.manager.id);
          return of(cinExists ? { cinExists: true } : null);
        }),
        first()
      );
    };
  }



 

  onSubmit() {
    if (this.managerForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const managerData = {
        id: this.manager.id,
        name: this.managerForm.get('name').value,
        lastName: this.managerForm.get('lastName').value,
        email: this.managerForm.get('email').value,
        cin: this.managerForm.get('cin').value,
        gender: this.managerForm.get('gender').value,
    
      };

      this.managerService.updateManager(managerData).subscribe(
        response => {
          this.isSubmitting = false;
          this.closeDialog.emit();
          this.managerUpdated.emit({ success: true, message: 'Manager mis à jour avec succès' });
        },
        error => {
          this.isSubmitting = false;
          this.managerUpdated.emit({ success: false, message: 'Erreur lors de la mise à jour du manager' });
        }
      );
    }
  }

  onCloseClick() {
    this.closeDialog.emit();
  }

  showFeedbackMessage(message: string) {
    this.feedbackMessage = message;
    this.showFeedback = true;
    setTimeout(() => {
      this.showFeedback = false;
    }, 3000);
  }
}