import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-circle-chart',
  standalone: true,
  imports: [],
  templateUrl: './circle-chart.component.html',
  styleUrl: './circle-chart.component.scss'
})
export class CircleChartComponent implements OnInit {
  @Input() percentage: number ;
  @Input() color: string = '#00B98E';
  @Input() size: number = 200;

  constructor() { }

  ngOnInit(): void { }

  get dashArray(): string {
    return `${this.percentage * 2.198}, 219.8`;
  }
}
