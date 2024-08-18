import { Component, OnDestroy, OnInit } from '@angular/core';
import { ListReportsComponent } from "../../components/list-reports/list-reports.component";
import { SharedModule } from "../../../theme/shared/shared.module";
import { CommonModule, DatePipe } from '@angular/common';
import { BehaviorSubject, Subscription, Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MemberService } from 'src/app/core/services/member.service';
import { Member } from 'src/app/shared/models/member';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [ListReportsComponent, SharedModule,CommonModule,DatePipe],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit, OnDestroy {

  private employeSubject = new BehaviorSubject<Member[]>([]);
  private subscription: Subscription = new Subscription();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  employes$ = this.employeSubject.asObservable();

  constructor(
    private employeService: MemberService,
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
      this.employeService.findByManager().pipe(tap((employes) => console.log('emplyyeee', employes))),
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
