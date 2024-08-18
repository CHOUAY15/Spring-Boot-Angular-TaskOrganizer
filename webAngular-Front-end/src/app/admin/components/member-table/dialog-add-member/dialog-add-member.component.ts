import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { debounceTime, first, Observable, of, switchMap } from 'rxjs';
import { MemberService } from 'src/app/core/services/member.service';
import { SectionService } from 'src/app/core/services/section.service';
import { TeamService } from 'src/app/core/services/team.service';

@Component({
  selector: 'app-dialog-add-member',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './dialog-add-member.component.html',
  styleUrl: './dialog-add-member.component.scss'
})
export class DialogAddMemberComponent implements OnInit {
  @Output() closeDialog = new EventEmitter<void>();
  @Output() managerAdded = new EventEmitter<{ success: boolean, message: string }>();
 
  genders: string[] = ['Homme', 'Femme'];
  managerForm: FormGroup;
  sections: any[] = [];
  teams: any[] = [];
  isSubmitting: boolean = false;
 
  showFeedback: boolean = false;
  feedbackMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private managerService: MemberService,
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
      teamId: ['', Validators.required]
    });
  }

  emailExistsValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.managerService.findAll().pipe(
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
      return this.managerService.findAll().pipe(
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

      this.teamService.findTeamsBySectId(secId).subscribe(
        teams => {
          this.teams = teams;
          this.managerForm.get('teamsId').setValue([]);
    
        },
        error => {
          console.error('Error loading teams', error);
          this.showFeedbackMessage('Erreur lors du chargement des équipes');
      
        }
      );
    }
  }

  onSubmit() {
    if (this.managerForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const managerData = {
        member: {
          name: this.managerForm.get('name').value,
          lastName: this.managerForm.get('lastName').value,
          email: this.managerForm.get('email').value,
          cin: this.managerForm.get('cin').value,
          gender: this.managerForm.get('gender').value,
          team:{id:this.managerForm.get('teamId').value},
          
        
        }
      };

      this.managerService.addToTeam(managerData).subscribe(
        response => {
          this.isSubmitting = false;
          this.closeDialog.emit();
          this.managerAdded.emit({ success: true, message: 'Membre ajouté avec succès' });
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