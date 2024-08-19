import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { SectionService } from 'src/app/core/services/section.service';
import { Section } from 'src/app/shared/models/section';

@Component({
  selector: 'app-dialog-update-section',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog-update-section.component.html',
  styleUrl: './dialog-update-section.component.scss'
})
export class DialogUpdateSectionComponent implements OnInit {
  @Output() close = new EventEmitter<void>();

  @Output() sectionUpdated = new EventEmitter<Section>();
  @Input() sectionToUpdate: Section;
  
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
    this.populateForm();
  }
  private initializeForm(): void {
    this.sectionForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]]
    });
  }
  private populateForm(): void {
    if (this.sectionToUpdate) {
      this.sectionForm.patchValue({
        nom: this.sectionToUpdate.name
      });
    }
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
    if (this.sectionForm.valid && this.sectionToUpdate) {
      this.isSubmitting = true;
      this.isLoading = true;
      this.successMessage = null;
      this.errorMessage = null;

      const formValue = this.sectionForm.value;
      const sectionSubmit: Section = {
        ...this.sectionToUpdate,
        name: formValue.nom
      };

      this.sectionService.update(sectionSubmit).subscribe(
        (updatedSection: Section) => {
          this.isLoading = false;
          this.successMessage = "Section modifiée avec succès!";
          setTimeout(() => {
            this.sectionUpdated.emit(updatedSection);
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