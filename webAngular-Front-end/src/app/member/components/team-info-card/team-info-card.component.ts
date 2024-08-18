import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Team } from 'src/app/shared/models/team';





@Component({
  selector: 'app-team-info-card',
  standalone:true,
  imports:[DatePipe],
  templateUrl: './team-info-card.component.html',
  styleUrls: ['./team-info-card.component.scss']
})
export class TeamInfoCardComponent {
  @Input() equipe!: Team;

  isExpanded = false;


}
