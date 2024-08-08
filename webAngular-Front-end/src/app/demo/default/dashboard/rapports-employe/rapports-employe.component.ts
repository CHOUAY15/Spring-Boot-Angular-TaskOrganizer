import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';
import { ProjetService } from 'src/app/services/projet.service';
import { ListDocumentsComponent } from "../list-documents/list-documents.component";
import { SharedModule } from "../../../../theme/shared/shared.module";
import { EmployeWithOpen } from 'src/app/model/employe';
import { EmployeService } from 'src/app/services/employe.service';
import { ListRapportsComponent } from "../list-rapports/list-rapports.component";

@Component({
  selector: 'app-rapports-employe',
  standalone: true,
  imports: [CommonModule, DatePipe, ListDocumentsComponent, SharedModule, ListRapportsComponent],
  templateUrl: './rapports-employe.component.html',
  styleUrl: './rapports-employe.component.scss'
})
export class RapportsEmployeComponent implements OnInit, OnDestroy {

  private employeSubject = new BehaviorSubject<EmployeWithOpen[]>([]);
  private subscription: Subscription = new Subscription();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  employes$ = this.employeSubject.asObservable();

  constructor(
    private employeService: EmployeService,
    private stateService: LoadingService
  ) {
    this.loading$ = this.stateService.loading$;
    this.error$ = this.stateService.error$;
  }

  ngOnInit(): void {
    this.loadEmployes();
  }

  loadEmployes() {
    const loadedData$ = this.stateService.loadData(
      this.employeService.getEmployeesByChefId().pipe(tap((employes) => console.log('emplyyeee', employes))),
      400
    );

    this.subscription.add(
      loadedData$.subscribe(
        (employes) => {
          console.log('employes: Updating employes', employes);
          this.employeSubject.next(employes || []);
        },
        (error) => console.error('employes: Error in employes subscription', error)
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
