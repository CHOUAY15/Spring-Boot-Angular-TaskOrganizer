import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MemberTableComponent } from '../../components/member-table/member-table.component';
import { BehaviorSubject, Subscription, Observable, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MemberService } from 'src/app/core/services/member.service';
import { Member } from 'src/app/shared/models/member';

@Component({
  selector: 'app-all-members',
  standalone: true,
  imports: [MemberTableComponent, SharedModule, CommonModule, RouterLink],
  templateUrl: './all-members.component.html',
  styleUrl: './all-members.component.scss'
})
export class AllMembersComponent implements OnInit, OnDestroy {
  private memberSubject = new BehaviorSubject<Member[]>([]); // Renamed 'employeSubject' to 'memberSubject' for consistency
  private subscription: Subscription = new Subscription();

  // Properties
  teamId: string = ''; // Renamed 'equipeId' to 'teamId' for consistency
  teamName: string = ''; // Renamed 'nomEquipe' to 'teamName' for consistency
  members: Member[] = []; // Renamed 'employes' to 'members' for consistency
  members$ = this.memberSubject.asObservable(); // Renamed 'employeSubject' to 'memberSubject'
  loading$: Observable<boolean>;
  error$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService, // Renamed 'stateService' to 'loadingService' for clarity
    private memberService: MemberService // Renamed 'employeService' to 'memberService' for consistency
  ) {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.loadingService.error$;
  }

  ngOnInit(): void {
      this.loadMembers(); // Renamed 'loadEmployes' to 'loadMembers' for consistency
   
  }

  loadMembers() {
    const loadedData$ = this.loadingService.loadData(
      this.memberService.findByManager().pipe(tap(members => console.log('Members received', members))),
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
