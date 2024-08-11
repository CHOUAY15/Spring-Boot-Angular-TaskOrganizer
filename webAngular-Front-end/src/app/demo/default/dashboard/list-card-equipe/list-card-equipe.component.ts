import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardEquipeComponent } from '../card-equipe/card-equipe.component';
import { CardEquipe } from 'src/app/model/card-equipe';
import { EquipeService } from 'src/app/services/equipes.service';
import { Observable, tap, Subscription, BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from "../../../../theme/shared/shared.module";
import { LoadingService } from 'src/app/services/loading.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-card-equipe',
  standalone: true,
  imports: [CardEquipeComponent, CommonModule, MatIconModule, SharedModule, FormsModule],
  templateUrl: './list-card-equipe.component.html',
  styleUrl: './list-card-equipe.component.scss'
})
export class ListCardEquipeComponent implements OnInit, OnDestroy {
  
  private equipeSubject = new BehaviorSubject<CardEquipe[]>([]);
  private allEquipes: CardEquipe[] = [];
  equipes$ = this.equipeSubject.asObservable();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  private subscription: Subscription = new Subscription();
  filterText: string = '';
 
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
    400
    );

    this.subscription.add(
      loadedData$.subscribe(
        equipes => {
          console.log('ListCardEquipeComponent: Updating equipes', equipes);
          this.allEquipes = equipes || [];
          this.equipeSubject.next(this.allEquipes);
        },
        error => console.error('ListCardEquipeComponent: Error in equipes subscription', error)
      )
    );
  }

  filterEquipes() {
    if (!this.filterText) {
      this.equipeSubject.next(this.allEquipes);
      return;
    }

    const filteredEquipes = this.allEquipes.filter(equipe => 
      equipe.nom.toLowerCase().includes(this.filterText.toLowerCase()) ||
      equipe.nomDepartement.toLowerCase().includes(this.filterText.toLowerCase())
    );

    this.equipeSubject.next(filteredEquipes);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}