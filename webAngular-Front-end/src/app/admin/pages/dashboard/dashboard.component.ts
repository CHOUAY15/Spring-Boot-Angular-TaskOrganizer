import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../../components/card/card.component';
import { MonthlyBarChartComponent } from '../../components/monthly-bar-chart/monthly-bar-chart.component';
import { IncomeOverviewChartComponent } from '../../components/income-overview-chart/income-overview-chart.component';
import { CircleChartComponent } from '../../components/circle-chart/circle-chart.component';
import { StatsService } from 'src/app/core/services/stats.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, MonthlyBarChartComponent, IncomeOverviewChartComponent, CircleChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  cards: any[] = [];
  pourcentage:number;

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    forkJoin({
      members: this.statsService.getTotalMembers(),
      managers: this.statsService.getTotalManagers(),
      projects: this.statsService.getTotalProjects(),
      teams: this.statsService.getTotalTeams(),
      projectProgress: this.statsService.getProjectProgressRatio()
    }).subscribe((results) => {
      this.cards = [
        { title: 'Total des membres', value: results.members, icon: 'fa-users', percentage: 5.2, comment: 'Increased membership this month' },
        {
          title: 'Total des gestionnaires',
          value: results.managers,
          icon: 'fa-user-tie',
          percentage: -2.1,
          comment: 'Slight decrease in manager count'
        },
        {
          title: 'Total des projets',
          value: results.projects,
          icon: 'fa-project-diagram',
          percentage: 10.5,
          comment: 'New projects initiated'
        },
        { title: 'Total des équipes', value: results.teams, icon: 'fa fa-user-friends', percentage: 0, comment: 'Stable teams count' }
      ];
      this.pourcentage=results.projectProgress.percentage;
    });
  }
}
