import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MemberTableComponent } from '../../components/member-table/member-table.component';
import { Manager } from 'src/app/shared/models/manager';
import { ManagerService } from 'src/app/core/services/manager.service';
import { BehaviorSubject, Subscription, Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { ManagerTableComponent } from "../../components/manager-table/manager-table.component";

@Component({
  selector: 'app-managers',
  standalone: true,
  imports: [MemberTableComponent, SharedModule, CommonModule, RouterLink, ManagerTableComponent],
  templateUrl: './managers.component.html',
  styleUrl: './managers.component.scss'
})
export class ManagersComponent implements OnInit, OnDestroy {

  private memberSubject = new BehaviorSubject<Manager[]>([]); // Renamed 'employeSubject' to 'memberSubject' for consistency
  private subscription: Subscription = new Subscription();

  // Properties
  teamId: string = ''; // Renamed 'equipeId' to 'teamId' for consistency
  members: Manager[] = []; // Renamed 'employes' to 'members' for consistency
  members$ = this.memberSubject.asObservable(); // Renamed 'employeSubject' to 'memberSubject'
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService, // Renamed 'stateService' to 'loadingService' for clarity
    private memberService: ManagerService // Renamed 'employeService' to 'memberService' for consistency
  ) {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.loadingService.error$;
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.teamId = params['id']; // Renamed 'equipeId' to 'teamId' for consistency
      this.loadMembers(); // Renamed 'loadEmployes' to 'loadMembers' for consistency
    });
  }

  loadMembers() {
    const loadedData$ = this.loadingService.loadData(
      this.memberService.getAllManagers().pipe(tap(members => console.log('Members received', members))),
      400
    );

    this.subscription.add(
      loadedData$.subscribe(
        members => {
          console.log('Updating members', members);
          this.memberSubject.next(members || []);
        },
        error => console.error('Error in members subscription', error)
      )
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
