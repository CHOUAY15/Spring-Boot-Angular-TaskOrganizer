import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/core/services/department.service';
import { Department } from 'src/app/shared/models/department';

@Component({
  selector: 'app-dialog-add-department',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './dialog-add-department.component.html',
  styleUrl: './dialog-add-department.component.scss'
})
export class DialogAddDepartmentComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() departmentAdd = new EventEmitter<Department>();



  departemntForm: FormGroup;
  isLoading: boolean = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private departementService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.departemntForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      localisation: ['', Validators.required],
      contact: ['', Validators.required],
    });
  }

 







  onCloseClick(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.departemntForm.valid ) {
      this.isSubmitting = true;
      this.isLoading = true;
      this.successMessage = null;
      this.errorMessage = null;

      const formValue = this.departemntForm.value;
      const departementSubmit: any = {
        name: formValue.nom,
        localisation: formValue.localisation,
        contact: formValue.contact,
      };

      this.departementService.saveDepartement(departementSubmit).subscribe(
        (newDepartement: Department) => {
         
          this.isLoading = false;
       
          this.successMessage = "Departement ajouté avec succès!";
          setTimeout(() => {
            this.departmentAdd.emit(newDepartement);
            this.close.emit();
          }, 2000);
        },
        error => {
          this.isLoading = false;
          this.errorMessage = "Erreur de connexion. Veuillez réessayer.";
        }
      );
    } else {
      this.departemntForm.markAllAsTouched();
      
      Object.keys(this.departemntForm.controls).forEach(key => {
        const control = this.departemntForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}