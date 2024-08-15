import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/core/services/member.service';
import { TaskService } from 'src/app/core/services/task.service';
import { Member } from 'src/app/shared/models/member';
import { TaskData } from 'src/app/shared/models/task';

@Component({
  selector: 'app-dialog-add-task',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.scss']
})
export class DialogAddTaskComponent implements OnInit {
  @Output() close = new EventEmitter<void>();
  @Output() tacheAdd = new EventEmitter<TaskData>();

  taskForm: FormGroup;
  teamMembers: Member[] = [];
  priorites: string[] = ['haute', 'moyenne', 'basse'];
  equipeId: string;
  @Input() prjtId: string;
  
  feedbackMessage = '';
  isSuccess = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: MemberService,
    private router: ActivatedRoute,
    private tacheService: TaskService
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadTeamMembers();
  }

  private initForm(): void {
    this.taskForm = this.fb.group({
      titre: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      employe: ['', Validators.required],
      nbrJours: [1, [Validators.required, Validators.min(1)]],
      priorite: ['', Validators.required]
    });
  }

  private loadTeamMembers(): void {
    this.router.paramMap.subscribe(params => {
      this.equipeId = params.get('teamId');
      if (this.equipeId) {
        this.employeeService.findByTeam(this.equipeId).subscribe({
          next: (data: Member[]) => this.teamMembers = data,
          error: (err) => console.error('Error fetching employees:', err)
        });
      }
    });
  }

  onCloseClick(): void {
    this.close.emit();
  }

  onSubmit(): void {
    if (this.taskForm.valid && this.prjtId) {
      const formData = this.taskForm.value;
      const tacheData: any = {
        title: formData.titre,
        description: formData.description,
        dayNbrs: formData.nbrJours,
        priority: formData.priorite,
        membreId: parseInt(formData.employe, 10),
        projectId: this.prjtId
      };

      this.tacheService.addTask(tacheData).subscribe({
        next: (newTache: TaskData) => {
          console.log('New tache added:', newTache);
          this.tacheAdd.emit(newTache);
          this.feedbackMessage = 'Tâche ajoutée avec succès!';
          this.isSuccess = true;
        },
        error: (error) => {
          console.error('Error while adding taches:', error);
          this.feedbackMessage = 'Erreur lors de l\'ajout de la tâche.';
          this.isSuccess = false;
        }
      });
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}