import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardEquipeComponent } from '../card-equipe/card-equipe.component';
import { CardEquipe } from 'src/app/model/card-equipe';
import { EquipeService } from 'src/app/services/equipes.service';
import { Observable, tap,Subscription, BehaviorSubject  } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from "../../../../theme/shared/shared.module";
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-list-card-equipe',
  standalone: true,
  imports: [CardEquipeComponent, CommonModule, MatIconModule, SharedModule],
  templateUrl: './list-card-equipe.component.html',
  styleUrl: './list-card-equipe.component.scss'
})
export class ListCardEquipeComponent implements OnInit, OnDestroy {
  private equipeSubject = new BehaviorSubject<CardEquipe[]>([]);
  equipes$ = this.equipeSubject.asObservable();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  private subscription: Subscription = new Subscription();
 
  constructor(
    private equipeService: EquipeService,
    private stateService: LoadingService
  ) {
    this.loading$ = this.stateService.loading$;
    this.error$ = this.stateService.error$;
  }

  ngOnInit(): void {
    this.loadEquipes();
  }

  loadEquipes() {
    const loadedData$ = this.stateService.loadData(
      this.equipeService.getAllEquipes().pipe(
        tap(equipes => console.log('ListCardEquipeComponent: Equipes received', equipes))
      ),
    600
    );

    this.subscription.add(
      loadedData$.subscribe(
        equipes => {
          console.log('ListCardEquipeComponent: Updating equipes', equipes);
          this.equipeSubject.next(equipes || []);
        },
        error => console.error('ListCardEquipeComponent: Error in equipes subscription', error)
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}