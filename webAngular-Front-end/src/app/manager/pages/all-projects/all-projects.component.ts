import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from "../../../theme/shared/shared.module";
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject, Subscription, Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/shared/models/project';
import { CommonModule } from '@angular/common';
import { FeedBackComponent } from 'src/app/shared/components/feed-back/feed-back.component';
import { AllProjectsTableComponent } from "../../components/all-projects-table/all-projects-table.component";

@Component({
  selector: 'app-all-projects',
  standalone: true,
  imports: [CommonModule, SharedModule, RouterLink, SharedModule, FeedBackComponent, AllProjectsTableComponent],
  templateUrl: './all-projects.component.html',
  styleUrl: './all-projects.component.scss'
})
export class AllProjectsComponent implements OnInit, OnDestroy {

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
  
      this.loadProjects();
    
  }

  loadProjects(): void {
    const projectsObservable = this.projectService.findByManager().pipe(
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
