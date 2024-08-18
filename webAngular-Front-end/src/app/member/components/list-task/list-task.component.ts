import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CartTaskComponent } from 'src/app/manager/components/cart-task/cart-task.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { StatutTache, TaskData } from 'src/app/shared/models/task';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from 'src/app/core/services/task.service';
import { ReportService } from 'src/app/core/services/report.service';
import { FeedBackComponent } from "../../../shared/components/feed-back/feed-back.component";

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CartTaskComponent,
    DragDropModule,
    FeedBackComponent
],
  templateUrl: './list-task.component.html',
  styleUrls: ['./list-task.component.scss']
})
export class ListTaskComponent implements OnInit, OnChanges {

  @Input() tasks: TaskData[] = [];
  @Input() prjtId: string = '';
  @Input() idMembre: number;
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskStatusChanged = new EventEmitter<{taskId: number, newStatus: StatutTache}>();
  membre:boolean=true;

  tasksAFaire: TaskData[] = [];
  tasksEnCours: TaskData[] = [];
  tasksTerminees: TaskData[] = [];
  statuts: StatutTache[] = [StatutTache.A_Faire, StatutTache.En_Cours, StatutTache.Termine];


  showFeedback = false;
  feedbackMessage = '';
  isSuccess: boolean = true;

  showImportPdfButton: boolean = false;

  constructor(private taskService: TaskService,private reportService:ReportService) {}

  ngOnInit() {
    this.updateTaskLists();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) {
      this.updateTaskLists();
    }
  }

  private updateTaskLists() {
    this.tasksAFaire = this.filterAndSortTasks(StatutTache.A_Faire);
    this.tasksEnCours = this.filterAndSortTasks(StatutTache.En_Cours);
    this.tasksTerminees = this.filterAndSortTasks(StatutTache.Termine);
    this.checkAllTasksCompleted();
  }

  private checkAllTasksCompleted() {
    this.showImportPdfButton = this.tasksTerminees.length > 0 && 
                               this.tasksAFaire.length === 0 && 
                               this.tasksEnCours.length === 0;
  }

  private filterAndSortTasks(status: StatutTache): TaskData[] {
    return this.tasks
      .filter(task => task.status === status)
      .sort((a, b) => {
        const priorityOrder = { haute: 1, moyenne: 2, basse: 3 };
        return (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0);
      });
  }

  getTasksList(statut: StatutTache): TaskData[] {
    switch (statut) {
      case StatutTache.A_Faire:
        return this.tasksAFaire;
      case StatutTache.En_Cours:
        return this.tasksEnCours;
      case StatutTache.Termine:
        return this.tasksTerminees;
      default:
        return [];
    }
  }

  getStatutFromListId(listId: string): StatutTache {
    switch (listId) {
      case 'todoList':
        return StatutTache.A_Faire;
      case 'inProgressList':
        return StatutTache.En_Cours;
      case 'doneList':
        return StatutTache.Termine;
      default:
        return StatutTache.A_Faire;
    }
  }

  drop(event: CdkDragDrop<TaskData[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.container.data[event.currentIndex];
      const newStatus = this.getStatutFromListId(event.container.id);
     
      
      this.taskService.updateTask(task.id, { status: newStatus, membreId: this.idMembre }).subscribe({
        next: (updatedTask) => {
          task.status = newStatus;
          this.taskStatusChanged.emit({taskId: task.id, newStatus});
          this.updateTaskLists();
        
        },
        error: (error) => {
          console.error('Erreur lors de la mise à jour du statut de la tâche:', error);
          transferArrayItem(
            event.container.data,
            event.previousContainer.data,
            event.currentIndex,
            event.previousIndex
          );
          this.updateTaskLists();
        }
      });
    }
  }






  


 
  importPdf() {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'application/pdf';

    fileInput.onchange = (event: any) => {
      const file = event.target.files[0];
      if (file) {
        this.uploadFileAndCreateReport(file);
      }
    };

    fileInput.click();
  }

  private uploadFileAndCreateReport(file: File) {
    this.reportService.uploadFileAndCreateReport(file, this.prjtId,this.idMembre).subscribe({
      next: (createdReport) => {
        console.log('Report created successfully:', createdReport);
        this.showFeedbackMessage('Rapport importé et enregistré avec succès!');
      },
      error: (error) => {
        console.error('Error uploading file or creating report:', error);
        this.showFeedbackMessage('Erreur lors de l\'import du rapport.');
      }
    });
  }
  showFeedbackMessage(message: string) {
    this.feedbackMessage = message;
    this.showFeedback = true;
  }

  closeFeedback() {
    this.showFeedback = false;
  }

}