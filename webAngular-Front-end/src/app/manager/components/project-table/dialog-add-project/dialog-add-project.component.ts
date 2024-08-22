import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { Deliverable } from 'src/app/shared/models/deliverable';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-dialog-add-project',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog-add-project.component.html',
  styleUrls: ['./dialog-add-project.component.scss']
})
export class DialogAddProjectComponent  implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() projectAdded = new EventEmitter<Project>();
  @Input() teamId: string;
  minDate: string;
  fileError: string | null = null;
  projetForm: FormGroup;
  livrables: any[] = [];
  files: File[] = [];
  selectedFile: File | null = null;
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private projetService: ProjectService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    // this.loadEquipeId();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
  }

  private initializeForm(): void {
    this.projetForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      livrable: [''],
      dateFin: [null, [Validators.required, this.dateValidator()]]
    });
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const inputDate = new Date(control.value);

      if (inputDate <= today) {
        return { 'dateInvalid': true };
      }
      return null;
    };
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      if (this.validateFile(file)) {
        this.selectedFile = file;
        this.fileError = null;
      } else {
        this.selectedFile = null;
        this.fileError = "Veuillez sélectionner un fichier PDF valide.";
      }
    }
  }

  validateFile(file: File): boolean {
    const fileNameParts = file.name.split('.');
    const extension = fileNameParts[fileNameParts.length - 1].toLowerCase();
    if (extension !== 'pdf') {
      return false;
    }

    if (file.size > 10 * 1024 * 1024) {
      return false;
    }

    return true;
  }

  // private loadEquipeId(): void {
  //   this.route.params.pipe(take(1)).subscribe(params => {
  //     this.teamId = params['id'];
  //   });
  // }

  onCloseClick(): void {
    this.close.emit();
  }

  onFileChange(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.files[index] = input.files[0];
    }
  }

  addLivrable(): void {
    const livrable = this.projetForm.get('livrable')?.value;
    if (livrable) {
      this.livrables.push({ name: livrable, path: '' });
      this.files.push(new File([], ''));
      this.projetForm.get('livrable')?.reset();
    }
  }

  removeLivrable(index: number): void {
    this.livrables.splice(index, 1);
    this.files.splice(index, 1);
  }
  onSubmit(): void {
    if (this.projetForm.valid && this.teamId && this.livrables.length > 0) {
      this.isSubmitting = true;
      this.isLoading = true;
      this.successMessage = null;
      this.errorMessage = null;

      const formValue = this.projetForm.value;
      const projectToSubmit: any = {
        name: formValue.nom,
        description: formValue.description,
        endDate: formValue.dateFin,
        deliverables: this.livrables.map(livrable => ({
          name: livrable.name,
          path: ''
        })),
        teamId: this.teamId
      };

      // Filter out any null or undefined files
      const filesToUpload = this.files.filter(file => file && file.name);

      this.projetService.addProjectWithFiles(projectToSubmit, filesToUpload).subscribe(
        (newProject: Project) => {
          console.log('New project added:', newProject);
          this.isLoading = false;
          this.successMessage = "Projet ajouté avec succès!";
          setTimeout(() => {
            this.projectAdded.emit(newProject);
            this.close.emit();
          }, 2000);
        },
        error => {
          console.error('Error while adding project:', error);
          this.isLoading = false;
          this.errorMessage = "Erreur lors de l'ajout du projet. Veuillez réessayer.";
        }
      );
    } else {
      this.projetForm.markAllAsTouched();
      if (this.livrables.length === 0) {
        console.error('At least one livrable is required');
      }
      if (!this.selectedFile) {
        this.fileError = "Veuillez sélectionner un fichier PDF valide.";
      }
      Object.keys(this.projetForm.controls).forEach(key => {
        const control = this.projetForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}