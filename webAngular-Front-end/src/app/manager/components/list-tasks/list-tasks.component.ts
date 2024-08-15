import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CartTaskComponent } from '../cart-task/cart-task.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { DialogAddTaskComponent } from "../task-table/dialog-add-task/dialog-add-task.component";
import { TaskData } from 'src/app/shared/models/task';
import { FeedBackComponent } from 'src/app/shared/components/feed-back/feed-back.component';

type Statut = 'A_Faire' | 'En_Cours' | 'Termine';

@Component({
  selector: 'app-list-tasks',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    CartTaskComponent,
    DialogAddTaskComponent,FeedBackComponent
  ],
  templateUrl: './list-tasks.component.html',
  styleUrls: ['./list-tasks.component.scss']
})
export class ListTasksComponent implements OnInit,OnChanges {

  @Input() tasks: TaskData[] = [];
  @Input() prjtId: string = '';
  @Output() taskDeleted = new EventEmitter<number>();

  tasksAFaire: TaskData[] = [];
  tasksEnCours: TaskData[] = [];
  tasksTerminees: TaskData[] = [];
  statuts: Statut[] = ['A_Faire', 'En_Cours', 'Termine'];

  showDialog = false;
  feedbackMessage: string = '';
  isSuccess: boolean = true;


  constructor() {}

  ngOnInit() {
    this.updateTaskLists();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['tasks']) {
      this.updateTaskLists();
    }
  }

  private updateTaskLists() {
    this.tasksAFaire = this.filterAndSortTasks('A_Faire');
    this.tasksEnCours = this.filterAndSortTasks('En_Cours');
    this.tasksTerminees = this.filterAndSortTasks('Termine');
  }

  private filterAndSortTasks(status: Statut): TaskData[] {
    return this.tasks
      .filter(task => task.status === status)
      .sort((a, b) => {
        const priorityOrder = { haute: 1, moyenne: 2, basse: 3 };
        return (priorityOrder[a.priority] || 0) - (priorityOrder[b.priority] || 0);
      });
  }

  getTasksList(statut: Statut): TaskData[] {
    switch (statut) {
      case 'A_Faire':
        return this.tasksAFaire;
      case 'En_Cours':
        return this.tasksEnCours;
      case 'Termine':
        return this.tasksTerminees;
      default:
        return [];
    }
  }

  getStatutFromListId(listId: string): Statut {
    switch (listId) {
      case 'todoList':
        return 'A_Faire';
      case 'inProgressList':
        return 'En_Cours';
      case 'doneList':
        return 'Termine';
      default:
        return 'A_Faire';
    }
  }

  addTask(statut: Statut) {
    this.showDialog = true;
  }

  handleClose() {
    this.showDialog = false;
    this.feedbackMessage = '';
  }

  onAddTask(newTask: TaskData) {
    console.log('New task received:', newTask);
    this.tasks = [...this.tasks, newTask];
    this.updateTaskLists();
    this.showDialog = false;
    this.showFeedback('Tâche ajoutée avec succès!', true);
  }


  onTaskDeleted(taskId: number) {
    this.tasks = this.tasks.filter(task => task.id !== taskId);
    this.updateTaskLists();
    this.taskDeleted.emit(taskId);
    this.showFeedback('Tâche supprimée avec succès!', true);
  }
  
  showFeedback(message: string, isSuccess: boolean) {
    this.feedbackMessage = message;
    this.isSuccess = isSuccess;
    setTimeout(() => {
      this.feedbackMessage = '';
    }, 3000);
  }
  closeFeedback() {
    this.feedbackMessage = '';
  }
}