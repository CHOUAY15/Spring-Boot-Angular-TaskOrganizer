import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { StatsService } from 'src/app/core/services/stats.service';
import {  combineLatest, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-circle-chart',
  standalone: true,
  imports: [],
  templateUrl: './circle-chart.component.html',
  styleUrl: './circle-chart.component.scss'
})
export class CircleChartComponent implements OnInit, OnDestroy {
  @Input() color: string = '#00B98E';
  @Input() size: number = 200;

  circlePath: string = '';
  percentage: number = 0;
  currentProjects: number = 0;
  completedProjects: number = 0;
  totalProjects: number = 0;

  private subscription: Subscription;

  constructor(private statService: StatsService) { }

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.statService.getTotalProjectsProgress(),
      this.statService.getTotalProjectsTermine(),
      this.statService.getTotalProjects()
    ]).pipe(
      map(([progress, completed, total]) => {
        this.percentage = progress;
        this.completedProjects = completed;
        this.totalProjects = total;
        this.currentProjects = total - completed;
        return progress;
      })
    ).subscribe(
      progress => {
        this.updateCirclePath();
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private updateCirclePath(): void {
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (this.percentage / 100) * circumference;
    const x = 50 + radius * Math.cos(2 * Math.PI * (this.percentage / 100) - Math.PI / 2);
    const y = 50 + radius * Math.sin(2 * Math.PI * (this.percentage / 100) - Math.PI / 2);
    this.circlePath = `M50,50 L50,15 A35,35 0 ${this.percentage > 50 ? 1 : 0},1 ${x},${y} Z`;
  }

  getCompletionRate(): string {
    if (this.totalProjects === 0) {
      return '0%';
    }
    return (this.completedProjects / this.totalProjects * 100).toFixed(1) + '%';
  }

  getProgressBarWidth(value: number): string {
    if (this.totalProjects === 0) {
      return '0%';
    }
    return (value / this.totalProjects * 100) + '%';
  }
}