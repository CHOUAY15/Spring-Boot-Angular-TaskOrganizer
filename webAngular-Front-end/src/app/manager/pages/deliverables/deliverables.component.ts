import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListDeliverablesComponent } from "../../components/list-deliverables/list-deliverables.component";
import { SharedModule } from "../../../theme/shared/shared.module";
import { CommonModule, DatePipe } from '@angular/common';
import { BehaviorSubject, Subscription, Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-deliverables',
  standalone: true,
  imports: [ListDeliverablesComponent, SharedModule,CommonModule,DatePipe],
  templateUrl: './deliverables.component.html',
  styleUrl: './deliverables.component.scss'
})
export class DeliverablesComponent implements OnInit, OnDestroy {

  private projetSubject = new BehaviorSubject<Project[]>([]);
  private subscription: Subscription = new Subscription();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  projets$ = this.projetSubject.asObservable();

  constructor(
    private projetService: ProjectService,
    private stateService: LoadingService
  ) {
    this.loading$ = this.stateService.loading$;
    this.error$ = this.stateService.error$;
  }

  ngOnInit(): void {
    this.loadProjets();
  }

  loadProjets() {
    const loadedData$ = this.stateService.loadData(
      this.projetService.findByManager().pipe(tap((projets) => console.log('prjts: prjts received', projets))),
      400
    );

    this.subscription.add(
      loadedData$.subscribe(
        (prjts) => {
          console.log('prjts: Updating prjts', prjts);
          this.projetSubject.next(prjts || []);
        },
        (error) => console.error('prjts: Error in prjts subscription', error)
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
