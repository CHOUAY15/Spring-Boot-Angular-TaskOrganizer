import { Component, OnDestroy, OnInit } from '@angular/core';
import { MemberTableComponent } from '../../components/member-table/member-table.component';
import { SharedModule } from '../../../theme/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject, Subscription, Observable, tap } from 'rxjs';
import { Member } from 'src/app/shared/models/member';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MemberService } from 'src/app/core/services/member.service';

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [MemberTableComponent, SharedModule, CommonModule, RouterLink],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class MembersComponent implements OnInit, OnDestroy {

  private memberSubject = new BehaviorSubject<Member[]>([]); // Renamed 'employeSubject' to 'memberSubject' for consistency
  private subscription: Subscription = new Subscription();

  // Properties
 
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
      this.memberService.findAll().pipe(tap(members => console.log('Members received', members))),
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
