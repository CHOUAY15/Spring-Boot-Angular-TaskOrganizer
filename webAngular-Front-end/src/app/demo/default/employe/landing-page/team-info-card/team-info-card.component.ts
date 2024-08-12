import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';

interface TeamChef {
  nom: string;
  prenom: string;
  email: string;
}

interface Team {
  nom: string;
  description: string;
  nbrEmploye: number;
  dateCreation: Date;
  chef: TeamChef;
}

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
