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
      averagemember: this.statsService.getAverageMember(),
      averageManager: this.statsService.getAverageManager(),

    }).subscribe((results) => {
      this.cards = [
        {
          id: 1,
          title: 'Total des membres',
          value: results.members,
          icon: 'fa-users',
          percentage: results.averagemember,
          comment: results.averagemember > 1 ? 'Bon équilibre, plusieurs membres par équipe.' : "Trop d'équipes, risque de sous-effectif."
        },
        {
          id: 2,
          title: 'Total des gestionnaires',
          value: results.managers,
          icon: 'fa-user-tie',
          percentage: results.averageManager,
          comment:
            results.averageManager > 1
              ? "Trop de gestionnaires freine l'efficacité."
              : "Gestionnaires en nombre suffisant optimisent l'efficacité."
        },
        {
          id: 3,
          title: 'Total des projets',
          value: results.projects,
          icon: 'fa-project-diagram',
          percentage: 10.5,
          comment: 'New projects initiated'
        },
        {
          id: 4,
          title: 'Total des équipes',
          value: results.teams,
          icon: 'fa fa-user-friends',
          percentage: 0,
          comment: 'Stable teams count'
        }
      ];
    });
  }
}
