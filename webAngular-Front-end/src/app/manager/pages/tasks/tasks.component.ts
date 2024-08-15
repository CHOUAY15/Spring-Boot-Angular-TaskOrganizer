import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ListTasksComponent } from '../../components/list-tasks/list-tasks.component';
import { BehaviorSubject, Subscription, Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskData } from 'src/app/shared/models/task'; // Added import for Task model

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [ListTasksComponent, RouterLink, SharedModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class TasksComponent implements OnInit, OnDestroy {
  private taskSubject = new BehaviorSubject<TaskData[]>([]); // Renamed 'tacheSubject' to 'taskSubject' for consistency
  private subscription: Subscription = new Subscription();

  tasks$ = this.taskSubject.asObservable(); // Renamed 'taches$' to 'tasks$'
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  projectName: string = ''; // Renamed 'nomProjet' to 'projectName' and initialized
  projectId: string = ''; // Renamed 'prjtId' to 'projectId' and initialized

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService, // Renamed 'stateService' to 'loadingService' for clarity
    private taskService: TaskService // Renamed 'tacheService' to 'taskService' for consistency
  ) {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.loadingService.error$;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.projectId = params['id']; // Renamed 'prjtId' to 'projectId' for consistency
      this.projectName = params['projectName']; // Renamed 'nomProjet' to 'projectName'
      this.loadTasks(); // Renamed 'loadTaches' to 'loadTasks' for consistency
    });
  }

  loadTasks() {
    const loadedData$ = this.loadingService.loadData(
      this.taskService.getTasksByProject(this.projectId).pipe(tap(tasks => console.log('Tasks received', tasks))),
      400
    );

    this.subscription.add(
      loadedData$.subscribe(
        tasks => {
          console.log('Updating tasks', tasks);
          this.taskSubject.next(tasks || []);
        },
        error => {
          console.error('Error in tasks subscription', error);
        }
      )
    );
  }
  onTaskDeleted(taskId: number) {
    const currentTasks = this.taskSubject.value;
    const updatedTasks = currentTasks.filter(task => task.id !== taskId);
    this.taskSubject.next(updatedTasks);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
