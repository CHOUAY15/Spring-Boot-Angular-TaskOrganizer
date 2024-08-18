import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardTeamComponent } from '../card-team/card-team.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BehaviorSubject, Observable, Subscription, tap, map } from 'rxjs';
import { Team } from 'src/app/shared/models/team';
import { TeamService } from 'src/app/core/services/team.service';
import { LoadingService } from 'src/app/core/services/loading.service';

@Component({
  selector: 'app-list-teams',
  standalone: true,
  imports: [CardTeamComponent, CommonModule, MatIconModule, SharedModule, FormsModule],
  templateUrl: './list-teams.component.html',
  styleUrls: ['./list-teams.component.scss']
})
export class ListTeamsComponent implements OnInit, OnDestroy {
  private teamSubject = new BehaviorSubject<Team[]>([]);
  private allTeams: Team[] = [];
  teams$ = this.teamSubject.asObservable();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  private subscription: Subscription = new Subscription();
  filterText: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 6;
  totalPages: number = 1;

  constructor(
    private teamService: TeamService,
    private loadingService: LoadingService
  ) {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.loadingService.error$;
  }

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams(): void {
    const loadedData$ = this.loadingService.loadData(
      this.teamService.findByManager().pipe(
        tap(teams => console.log('ListTeamsComponent: Teams received', teams))
      ),
      400
    );

    this.subscription.add(
      loadedData$.subscribe(
        teams => {
          console.log('ListTeamsComponent: Updating teams', teams);
          this.allTeams = teams || [];
          this.filterTeams();
        },
        error => console.error('ListTeamsComponent: Error in teams subscription', error)
      )
    );
  }

  filterTeams(): void {
    let filteredTeams = this.allTeams;
    if (this.filterText) {
      filteredTeams = this.allTeams.filter(team =>
        team.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
        team.sectionName.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
    this.totalPages = Math.ceil(filteredTeams.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedTeams(filteredTeams);
  }

  updatePaginatedTeams(teams: Team[]): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const paginatedTeams = teams.slice(startIndex, startIndex + this.itemsPerPage);
    this.teamSubject.next(paginatedTeams);
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedTeams(this.getFilteredTeams());
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedTeams(this.getFilteredTeams());
    }
  }

  private getFilteredTeams(): Team[] {
    if (!this.filterText) {
      return this.allTeams;
    }
    return this.allTeams.filter(team =>
      team.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
      team.sectionName.toLowerCase().includes(this.filterText.toLowerCase())
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}