import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ManagerService } from 'src/app/core/services/manager.service';
import { SectionService } from 'src/app/core/services/section.service';
import { TeamService } from 'src/app/core/services/team.service';
import { Manager } from 'src/app/shared/models/manager';
import { Section } from 'src/app/shared/models/section';
import { Team } from 'src/app/shared/models/team';

@Component({
  selector: 'app-dialog-update-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogUpdateTeamComponent],
  templateUrl: './dialog-update-team.component.html',
  styleUrl: './dialog-update-team.component.scss'
})
export class DialogUpdateTeamComponent implements OnInit {
  @Input() teamToUpdate: any;
  @Output() close = new EventEmitter<void>();
  @Output() teamUpdated = new EventEmitter<Team>();

  teamForm: FormGroup;
  sections: Section[] = [];
  managers: Manager[] = [];
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    private sectionService: SectionService,
    private managerService: ManagerService,
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadSections();

    if (!this.teamForm.get('sectionId').value) {
      this.teamForm.get('sectionId').setValue(this.teamToUpdate.sectionId);
    }
    if (this.teamToUpdate) {
      this.populateForm();
    }
  }

  private initializeForm(): void {
    this.teamForm = this.fb.group({
      name: [this.teamToUpdate.name, [Validators.required, Validators.minLength(3)]],
      description: [this.teamToUpdate.description, Validators.required],
      sectionId: [this.teamToUpdate.sectionId, Validators.required],
      managerId: [this.teamToUpdate.managerId]
    });

    this.teamForm.get('sectionId')?.valueChanges.subscribe(sectionId => {
      if (sectionId) {
        this.loadManagers(sectionId);
      }
    });
  }

  private populateForm(): void {
    this.teamForm.patchValue({
      name: this.teamToUpdate.name,
      description: this.teamToUpdate.description,
      sectionId: this.teamToUpdate.sectionId,
      managerId: this.teamToUpdate.managerId
    });
    this.loadManagers(this.teamToUpdate.sectionId);
  }

  private loadSections(): void {
    this.sectionService.findAll().subscribe(
      sections => {
        this.sections = sections;
      },
      error => {
        console.error('Error loading sections:', error);
      }
    );
  }

  private loadManagers(sectionId: number): void {
    this.managerService.findBySectionId(sectionId).subscribe(
      managers => {
        this.managers = managers;
      },
      error => {
        console.error('Error loading managers:', error);
      }
    );
  }

  onCloseClick(): void {
    this.close.emit();
  }
  removeManager(): void {
    this.teamForm.get('managerId').setValue(null);
  }

  onSubmit(): void {
    if (this.teamForm.valid) {
      this.isSubmitting = true;
      this.isLoading = true;
      this.successMessage = null;
      this.errorMessage = null;

 const formValue = this.teamForm.value;
    const teamToSubmit: any = {
      name: formValue.name,
      description: formValue.description,
      sectionId: formValue.sectionId, // This will always have a value
      managerId: formValue.managerId
    };
      this.teamService.update(this.teamToUpdate.id, teamToSubmit).subscribe(
        (updatedTeam: Team) => {
          this.isLoading = false;
          this.successMessage = "Équipe mise à jour avec succès!";
          setTimeout(() => {
            this.teamUpdated.emit(updatedTeam);
            this.close.emit();
          }, 2000);
        },
        error => {
          console.error('Error while updating team:', error);
          this.isLoading = false;
          this.errorMessage = "Erreur de connexion. Veuillez réessayer.";
        }
      );
    } else {
      this.teamForm.markAllAsTouched();
    }
  }
}