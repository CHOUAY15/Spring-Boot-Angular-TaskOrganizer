import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../theme/shared/shared.module';
import { ProjectTableComponent } from '../../components/project-table/project-table.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DialogAddProjectComponent } from '../../components/project-table/dialog-add-project/dialog-add-project.component';
import { Project } from 'src/app/shared/models/project';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { BehaviorSubject, Observable, Subscription, tap, of } from 'rxjs';
import { FeedBackComponent } from "../../../shared/components/feed-back/feed-back.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ProjectTableComponent, CommonModule, SharedModule, RouterLink, DialogAddProjectComponent, SharedModule, FeedBackComponent],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
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
    const projectsObservable = this.projectService.findByTeam(this.teamId).pipe(
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

  addProject(): void { // Added void return type for clarity
    this.showDialog = true;
  }

  handleClose(): void { // Added void return type for clarity
    this.showDialog = false;
  }

  onProjectAdded(newProject: Project): void {
    this.loadProjects();
    this.showDialog = false;
    this.showFeedback = true;
    this.feedbackMessage = 'Projet ajoutée avec succès!!';

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
