import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import {  ProjectWithOpenState } from 'src/app/model/projetSubmitData';
import { LoadingService } from 'src/app/services/loading.service';
import { ProjetService } from 'src/app/services/projet.service';
import { ListDocumentsComponent } from "../list-documents/list-documents.component";
import { SharedModule } from "../../../../theme/shared/shared.module";

@Component({
  selector: 'app-documents-projet',
  standalone: true,
  imports: [CommonModule, DatePipe, ListDocumentsComponent, SharedModule],
  templateUrl: './documents-projet.component.html',
  styleUrl: './documents-projet.component.scss'
})
export class DocumentsProjetComponent implements OnInit, OnDestroy {

  private projetSubject = new BehaviorSubject<ProjectWithOpenState[]>([]);
  private subscription: Subscription = new Subscription();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  projets$ = this.projetSubject.asObservable();

  constructor(
    private projetService: ProjetService,
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
      this.projetService.getProjetsByChef().pipe(tap((projets) => console.log('prjts: prjts received', projets))),
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
