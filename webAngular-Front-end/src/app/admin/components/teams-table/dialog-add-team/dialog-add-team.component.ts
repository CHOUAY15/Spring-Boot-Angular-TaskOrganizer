import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeamService } from 'src/app/core/services/team.service';
import { ManagerService } from 'src/app/core/services/manager.service';
import { Team } from 'src/app/shared/models/team';
import { Manager } from 'src/app/shared/models/manager';
import { DialogAddManagerComponent } from "../../manager-table/dialog-add-manager/dialog-add-manager.component";
import { Section } from 'src/app/shared/models/section';
import { SectionService } from 'src/app/core/services/section.service';

@Component({
  selector: 'app-dialog-add-team',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DialogAddManagerComponent],
  templateUrl: './dialog-add-team.component.html',
  styleUrls: ['./dialog-add-team.component.scss']
})
export class DialogAddTeamComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() teamAdded = new EventEmitter<Team>();

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
  }

  private initializeForm(): void {
    this.teamForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      sectionId: ['', Validators.required],
      managerId: ['']
    });

    this.teamForm.get('sectionId')?.valueChanges.subscribe(deptId => {
      if (deptId) {
        this.loadManagers(deptId);
      }
    });
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

  private loadManagers(deptId: number): void {
    this.managerService.findBySectionId(deptId).subscribe(
      managers => {
        this.managers = managers;
        console.log('Managers loaded:', this.managers); // Add this line for debugging
      },
      error => {
        console.error('Error loading managers:', error);
      }
    );
  }

  onCloseClick(): void {
    this.close.emit();
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
        sectionId: formValue.sectionId,
        managerId: formValue.managerId || null
      };

      this.teamService.addTeamToSection(teamToSubmit).subscribe(
        (newTeam: Team) => {
          console.log('New team added:', newTeam);
          this.isLoading = false;
          this.successMessage = "Équipe ajoutée avec succès!";
          setTimeout(() => {
            this.teamAdded.emit(newTeam);
            this.close.emit();
          }, 2000);
        },
        error => {
          console.error('Error while adding team:', error);
          this.isLoading = false;
          this.errorMessage = "Erreur de connexion. Veuillez réessayer.";
        }
      );
    } else {
      this.teamForm.markAllAsTouched();
      Object.keys(this.teamForm.controls).forEach(key => {
        const control = this.teamForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}