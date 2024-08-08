import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ListTachesComponent } from '../list-taches/list-taches.component';
import { Tache } from 'src/app/model/tache';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { TacheService } from 'src/app/services/tache.service';
import { SharedModule } from "../../../../theme/shared/shared.module";

@Component({
  selector: 'app-taches',
  standalone: true,
  imports: [ListTachesComponent, RouterLink, SharedModule],
  templateUrl: './taches.component.html',
  styleUrl: './taches.component.scss'
})
export class TachesComponent implements OnInit, OnDestroy {
  private tacheSubject = new BehaviorSubject<Tache[]>([]);
  private subscription: Subscription = new Subscription();
  taches$ = this.tacheSubject.asObservable();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  nomProjet: string;
  prjtId:string;

  constructor(
    private route: ActivatedRoute,
    private stateService: LoadingService,
    private tacheService:TacheService
  ) {this.loading$ = this.stateService.loading$;
    this.error$ = this.stateService.error$;}

 

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.prjtId = params['id'];
      this.nomProjet=params['nomProjet']
      this.loadTaches();
    });
   
  }
  loadTaches() {
    const loadedData$ = this.stateService.loadData(
      this.tacheService.getTachesByProjet(this.prjtId).pipe(tap((taches) => console.log('taches: tches received', taches))),
      400
    );

    this.subscription.add(
      loadedData$.subscribe(
        (taches) => {
          console.log('taches: Updating taches', taches);
          this.tacheSubject.next(taches || []);
        },
        (error) => console.error('taches: Error in taches subscription', error)
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
