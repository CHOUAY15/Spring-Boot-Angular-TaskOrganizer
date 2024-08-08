import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { Employee } from 'src/app/model/employe';
import { EmployeService } from 'src/app/services/employe.service';
import { LoadingService } from 'src/app/services/loading.service';
import { CommonModule } from '@angular/common';
import { SharedModule } from "../../../../theme/shared/shared.module";
import { ProjetTableComponent } from "../projet-table/projet-table.component";

@Component({
  selector: 'app-employes',
  standalone: true,
  imports: [EmployeeTableComponent, CommonModule, SharedModule,RouterLink],
  templateUrl: './employes.component.html',
  styleUrl: './employes.component.scss'
})
export class EmployesComponent implements OnInit ,OnDestroy{
  private employeSubject = new BehaviorSubject<Employee[]>([]);
  private subscription: Subscription = new Subscription();
  // proprites
  equipeId: string;
  nomEquipe!: string;
  employes: Employee[] = [];
  employes$ = this.employeSubject.asObservable();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  // constructeur

  constructor(
    private route: ActivatedRoute,
    private stateService: LoadingService,
    private employeService: EmployeService
  ) {
    this.loading$ = this.stateService.loading$;
    this.error$ = this.stateService.error$;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.equipeId = params['id'];
      this.loadEmployes();
      this.nomEquipe=params['nomEquipe']
    });

  }

  loadEmployes() {
    const loadedData$ = this.stateService.loadData(
      this.employeService.getEmployeesByTeamId(this.equipeId).pipe(tap((equipes) => console.log('equipes: equipes received', equipes))),
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
