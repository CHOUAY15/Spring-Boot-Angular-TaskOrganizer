import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule, AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { SectionService } from 'src/app/core/services/section.service';
import { ManagerService } from 'src/app/core/services/manager.service';
import { TeamService } from 'src/app/core/services/team.service';
import { FeedBackComponent } from 'src/app/shared/components/feed-back/feed-back.component';
import { Observable, debounceTime, switchMap, of, first } from 'rxjs';

@Component({
  selector: 'app-dialog-add-manager',
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
  templateUrl: './dialog-add-manager.component.html',
  styleUrl: './dialog-add-manager.component.scss'
})
export class DialogAddManagerComponent implements OnInit {
  @Output() closeDialog = new EventEmitter<void>();
  @Output() managerAdded = new EventEmitter<{ success: boolean, message: string }>();
 
  genders: string[] = ['Homme', 'Femme'];
  managerForm: FormGroup;
  sections: any[] = [];
  teams: any[] = [];
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
    this.loadSections();
  }

  createForm() {
    this.managerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email], [this.emailExistsValidator()]],
      cin: ['', [Validators.required, Validators.pattern(/^[A-Z]{2}\d{6}$/)],[this.cinExistsValidator()]],
      gender: ['', Validators.required],
      secionId: ['', Validators.required],
      teamsId: [[], Validators.required]
    });
  }

  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.managerService.getAllManagers().pipe(
        debounceTime(300),
        switchMap(managers => {
          const emailExists = managers.some(manager => manager.email.toLowerCase() === control.value.toLowerCase());
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
          const cinExists = managers.some(manager => manager.cin.toLowerCase() === control.value.toLowerCase());
          return of(cinExists ? { cinExists: true } : null);
        }),
        first()
      );
    };
  }

  loadSections() {
    this.sectionService.findAll().subscribe(
      sections => this.sections = sections,
      error => {
        this.showFeedbackMessage('Erreur lors du chargement des sections');
      }
    );
  }

  onSectionChange() {
    const secId = this.managerForm.get('secionId').value;
    if (secId) {
      this.isLoading = true;
      this.teamService.findTeamsBySectId(secId).subscribe(
        teams => {
          this.teams = teams;
          this.managerForm.get('teamsId').setValue([]);
          this.isLoading = false;
        },
        error => {
          console.error('Error loading teams', error);
          this.showFeedbackMessage('Erreur lors du chargement des équipes');
          this.isLoading = false;
        }
      );
    }
  }

  onSubmit() {
    if (this.managerForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const managerData = {
        manager: {
          name: this.managerForm.get('name').value,
          lastName: this.managerForm.get('lastName').value,
          email: this.managerForm.get('email').value,
          cin: this.managerForm.get('cin').value,
          gender: this.managerForm.get('gender').value,
          teamsId: this.managerForm.get('teamsId').value
        }
      };

      this.managerService.addManagerToTeams(managerData).subscribe(
        response => {
          this.isSubmitting = false;
          this.closeDialog.emit();
          this.managerAdded.emit({ success: true, message: 'Manager ajouté avec succès' });
        },
        error => {
          this.isSubmitting = false;
          this.closeDialog.emit();
          this.managerAdded.emit({ success: false, message: 'Erreur lors de l\'ajout du manager' });
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