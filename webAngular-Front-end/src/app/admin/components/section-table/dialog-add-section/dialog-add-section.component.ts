import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SectionService } from 'src/app/core/services/section.service';
import { Section } from 'src/app/shared/models/section';

@Component({
  selector: 'app-dialog-add-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog-add-section.component.html',
  styleUrls: ['./dialog-add-section.component.scss']
})
export class DialogAddSectionComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() sectionAdd = new EventEmitter<Section>();
  
  sectionForm: FormGroup;
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;
  existingSections: string[] = [];

  constructor(
    private fb: FormBuilder,
    private sectionService: SectionService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadExistingSections();
    this.setupNameValidation();
  }

  private initializeForm(): void {
    this.sectionForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]]
    });
  }

  private loadExistingSections(): void {
    this.sectionService.findAll().subscribe(
      (sections: Section[]) => {
        this.existingSections = sections.map(s => s.name.toLowerCase());
      },
      error => {
        console.error('Error loading sections:', error);
      }
    );
  }

  private setupNameValidation(): void {
    this.sectionForm.get('nom')?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(name => {
      if (name && this.existingSections.includes(name.toLowerCase())) {
        this.sectionForm.get('nom')?.setErrors({ 'duplicate': true });
      }
    });
  }

  onCloseClick(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.sectionForm.valid) {
      this.isSubmitting = true;
      this.isLoading = true;
      this.successMessage = null;
      this.errorMessage = null;

      const formValue = this.sectionForm.value;
      const sectionSubmit: any = {
        name: formValue.nom,
      };

      this.sectionService.save(sectionSubmit).subscribe(
        (newSection: Section) => {
          this.isLoading = false;
          this.successMessage = "Section ajoutée avec succès!";
          setTimeout(() => {
            this.sectionAdd.emit(newSection);
            this.close.emit();
          }, 2000);
        },
        error => {
          this.isLoading = false;
          this.errorMessage = "Erreur de connexion. Veuillez réessayer.";
        }
      );
    } else {
      this.sectionForm.markAllAsTouched();
    }
  }
}