// teams.component.ts

import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedModule } from '../../../theme/shared/shared.module';
import { TeamTableComponent } from '../../components/teams-table/teams-table.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DialogAddTeamComponent } from '../../components/teams-table/dialog-add-team/dialog-add-team.component';
import { Team } from 'src/app/shared/models/team';
import { LoadingService } from 'src/app/core/services/loading.service';
import { TeamService } from 'src/app/core/services/team.service';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { FeedBackComponent } from "../../../shared/components/feed-back/feed-back.component";

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [TeamTableComponent, CommonModule, SharedModule, RouterLink, DialogAddTeamComponent, SharedModule, FeedBackComponent],
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit, OnDestroy {

  private teamSubject = new BehaviorSubject<Team[]>([]);
  private subscription: Subscription = new Subscription();

  teams: Team[] = [];

  teams$ = this.teamSubject.asObservable();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  showDialog = false;
  showFeedback = false;
  feedbackMessage = '';
  isInitialLoad = true;

  constructor(
    private loadingService: LoadingService,
    private teamService: TeamService,
  ) {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.loadingService.error$;
  }

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    const teamsObservable = this.teamService.findAll().pipe(
      tap((teams) => console.log('TeamsComponent: Teams received', teams))
    );

    if (this.isInitialLoad) {
      const loadedData$ = this.loadingService.loadData(teamsObservable, 400);
      this.subscription.add(
        loadedData$.subscribe(
          (teams) => {
            console.log('TeamsComponent: Updating teams', teams);
            this.teamSubject.next(teams || []);
            this.isInitialLoad = false;
          },
          (error) => console.error('TeamsComponent: Error in teams subscription', error)
        )
      );
    } else {
      this.subscription.add(
        teamsObservable.subscribe(
          (teams) => {
            console.log('TeamsComponent: Updating teams', teams);
            this.teamSubject.next(teams || []);
          },
          (error) => console.error('TeamsComponent: Error in teams subscription', error)
        )
      );
    }
  }

  addTeam(): void {
    this.showDialog = true;
  }

  handleClose(): void {
    this.showDialog = false;
  }

  onTeamAdded(newTeam: Team): void {
    this.loadTeams();
    this.showDialog = false;
    this.showFeedback = true;
    this.feedbackMessage = 'Team added successfully!';
  }
  
  onTeamDeleted(): void {
    this.loadTeams();
    this.showFeedback = true;
    this.feedbackMessage = 'Team deleted successfully!';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeFeedback() {
    this.feedbackMessage = '';
  }
}