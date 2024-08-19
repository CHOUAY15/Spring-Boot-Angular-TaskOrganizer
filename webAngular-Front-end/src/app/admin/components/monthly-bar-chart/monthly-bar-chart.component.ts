// monthly-bar-chart.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { StatsService } from 'src/app/core/services/stats.service';
import {
  NgApexchartsModule,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexAxisChartSeries,
  ApexStroke,
  ApexXAxis,
  ApexYAxis,
  ApexTheme,
  ApexGrid,
  ApexPlotOptions
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  xaxis: ApexXAxis;
  colors: string[];
  stroke: ApexStroke;
  yaxis: ApexYAxis;
  grid: ApexGrid;
  theme: ApexTheme;
  plotOptions: ApexPlotOptions;  // Add this line
};


@Component({
  selector: 'app-monthly-bar-chart',
  standalone: true,
  imports: [SharedModule, NgApexchartsModule],
  templateUrl: './monthly-bar-chart.component.html',
  styleUrl: './monthly-bar-chart.component.scss'
})
export class MonthlyBarChartComponent implements OnInit {
  @ViewChild('chart') chart!: ChartComponent;
  chartOptions!: Partial<ChartOptions>;
  teamStatistics: any;
  activeView: 'week' | 'month' = 'week';

  constructor(private statsService: StatsService) {}

  ngOnInit() {
    this.fetchTeamStatistics();
  }

  fetchTeamStatistics() {
    this.statsService.getTeamStatistics().subscribe(
      (data) => {
        this.teamStatistics = data;
        this.updateChart();
      },
      (error) => {
        console.error('Error fetching team statistics:', error);
      }
    );
  }

  updateChart() {
    this.chartOptions = {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false
        },
        fontFamily: 'Roboto, sans-serif',
      },
      dataLabels: {
        enabled: false
      },
      colors: ['#4CAF50', '#2196F3'],
      series: [
        {
          name: 'Équipes',
          data: [
            this.teamStatistics.totalTeams,
            this.teamStatistics.teamsWithProjects,
            this.teamStatistics.teamsWithoutProjects
          ]
        },
        {
          name: 'Projets',
          data: [this.teamStatistics.totalProjects, 0, 0]
        }
      ],
      stroke: {
        curve: 'smooth',
        width: 2
      },
      xaxis: {
        categories: ['Total', 'Avec P', 'Sans P'],
        labels: {
          style: {
            colors: '#616161',
            fontSize: '12px',
            fontFamily: 'Roboto, sans-serif',
          }
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: '#616161',
            fontSize: '12px',
            fontFamily: 'Roboto, sans-serif',
          }
        }
      },
      grid: {
        borderColor: '#f1f1f1',
      },
      theme: {
        mode: 'light'
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
          columnWidth: '55%',
        },
      },
    };
  }

 
}