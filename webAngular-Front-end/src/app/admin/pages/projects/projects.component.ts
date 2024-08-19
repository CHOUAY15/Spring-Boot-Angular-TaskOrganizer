import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from "../../../theme/shared/shared.module";
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription, Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/shared/models/project';
import { ProjectTableComponent } from 'src/app/manager/components/project-table/project-table.component';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [SharedModule,ProjectTableComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit, OnDestroy {

  private projectSubject = new BehaviorSubject<Project[]>([]);
  private subscription: Subscription = new Subscription();

  teamName: string = '';
  teamId: string = '';
  projects: Project[] = [];

  projects$ = this.projectSubject.asObservable();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  showDialog = false;
  showFeedback = false;
  feedbackMessage = '';
  isInitialLoad = true;

  constructor(
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private projectService: ProjectService,
  ) {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.loadingService.error$;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.teamId = params['id'];
      this.teamName = params['teamName'];
      this.loadProjects();
    });
  }

  loadProjects(): void {
    const projectsObservable = this.projectService.findAll().pipe(
      tap((projects) => console.log('ProjectsComponent: Projects received', projects))
    );

    if (this.isInitialLoad) {
      const loadedData$ = this.loadingService.loadData(projectsObservable, 400);
      this.subscription.add(
        loadedData$.subscribe(
          (projects) => {
            console.log('ProjectsComponent: Updating projects', projects);
            this.projectSubject.next(projects || []);
            this.isInitialLoad = false;
          },
          (error) => console.error('ProjectsComponent: Error in projects subscription', error)
        )
      );
    } else {
      this.subscription.add(
        projectsObservable.subscribe(
          (projects) => {
            console.log('ProjectsComponent: Updating projects', projects);
            this.projectSubject.next(projects || []);
          },
          (error) => console.error('ProjectsComponent: Error in projects subscription', error)
        )
      );
    }
  }


  handleClose(): void { // Added void return type for clarity
    this.showDialog = false;
  }


  
  onProjectDeleted(): void {
    this.loadProjects();
    this.showFeedback = true;
    this.feedbackMessage = 'Projet supprimée avec succès!';

  }

  ngOnDestroy(): void { // Added void return type for clarity
    this.subscription.unsubscribe();
  }
  closeFeedback() {
    this.feedbackMessage = '';
  }
}
