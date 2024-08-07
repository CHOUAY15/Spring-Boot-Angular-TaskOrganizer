import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { Projet } from 'src/app/model/projet';
import { Deliverable, ProjectSubmited } from 'src/app/model/projetSubmitData';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-dialog-projet',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog-projet.component.html',
  styleUrls: ['./dialog-projet.component.scss']
})
export class DialogProjetComponent implements OnInit {


  @Output() close = new EventEmitter<void>();
  @Output() projectAdded = new EventEmitter<Projet>();
  @Input() equipeId: string;
  minDate: string;
  fileError: string | null = null;
  projetForm: FormGroup;
  livrables: Deliverable[] = [];
  files: File[] = [];
  selectedFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private projetService: ProjetService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadEquipeId();
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    this.minDate = tomorrow.toISOString().split('T')[0];
  }

  private initializeForm(): void {
    this.projetForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      livrable: [''],
      dateFin: [null, [Validators.required, this.dateValidator]]
    });
  }
  dateValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
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
    
    // Vérifier l'extension du fichier
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

  private loadEquipeId(): void {
    this.route.params.pipe(take(1)).subscribe(params => {
      this.equipeId = params['id'];
    });
  }

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
      this.livrables.push({ nom: livrable, path: '' });
      this.files.push(new File([], '')); // Placeholder file
      this.projetForm.get('livrable')?.reset();
    }
  }

  removeLivrable(index: number): void {
    this.livrables.splice(index, 1);
    this.files.splice(index, 1);
  }

  onSubmit(): void {
    if  (this.projetForm.valid && this.equipeId && this.livrables.length > 0 )  {
      const formValue = this.projetForm.value;
      const projectToSubmit: ProjectSubmited = {
        nom: formValue.nom,
        description: formValue.description,
        dateFin: formValue.dateFin,
        livrables: this.livrables
      };

      this.projetService.addProjectWithFiles(projectToSubmit, this.files, this.equipeId).subscribe(
        (newProject: Projet) => {
          console.log('New project added:', newProject);
          this.projectAdded.emit(newProject);
          this.close.emit();
        },
        error => {
          console.error('Error while adding project:', error);
        }
      );
    }
    else{
      this.projetForm.markAllAsTouched();
      if (this.livrables.length === 0) {
        // You might want to show an error message for livrables
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
