import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/model/employe';
import { Tache } from 'src/app/model/tache';
import { TacheSubmitData } from 'src/app/model/tacheSubmitData';
import { EmployeService } from 'src/app/services/employe.service';
import { TacheService } from 'src/app/services/tache.service';

@Component({
  selector: 'app-dialoge-tache',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './dialoge-tache.component.html',
  styleUrl: './dialoge-tache.component.scss'
})
export class DialogeTacheComponent implements OnInit {
  
  @Output() close = new EventEmitter<void>();
  @Output() tacheAdd = new EventEmitter<Tache>();

  taskForm: FormGroup;

  teamMembers :Employee[]=[];
  priorites: string[] = ['haute', 'moyenne', 'basse'];
  
  equipeId:string;
  @Input() prjtId:string;

  constructor(private fb: FormBuilder, private employeeService:EmployeService,private router:ActivatedRoute,private tacheService:TacheService) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      titre: ['', Validators.required],
      description: [''],
      employe: ['', Validators.required],
      nbrJours: [1, [Validators.required, Validators.min(1)]],
      priorite:['',Validators.required]
    });
    this.router.paramMap.subscribe(params => {
      this.equipeId = params.get('eqpId');
      if (this.equipeId) {
        this.getEmployees();
      }
    });
  }

  
  getEmployees(): void {
    this.employeeService.getEmployeesByTeamId(this.equipeId)
      .subscribe({
        next: (data: Employee[]) => this.teamMembers = data,
        error: (err) => console.error('Error fetching employees:', err)
      });
  }

  onCloseClick() {
    this.close.emit();
  }

  onSubmit() {
    if (this.taskForm.valid && this.prjtId) {
      const formData = this.taskForm.value;
      const tacheData: TacheSubmitData = {
        titre: formData.titre,
        description: formData.description,
        nbrJours: formData.nbrJours,
        priorite:formData.priorite,
        employe: { id: parseInt(formData.employe, 10) }
      };

   

      this.tacheService.addTache(tacheData, this.prjtId).subscribe(
        (newTache: Tache) => {
          console.log('New tache added:', newTache);
          this.tacheAdd.emit(newTache);
          this.close.emit();
        },
        error => {
          console.error('Error while adding taches:', error);
        }
      );
    }
  }
}
