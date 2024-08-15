import { Component } from '@angular/core';
import { ListTeamsComponent } from "../../components/list-teams/list-teams.component";

@Component({
  selector: 'app-teams',
  standalone: true,
  imports: [ListTeamsComponent],
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.scss'
})
export class TeamsComponent {

}
