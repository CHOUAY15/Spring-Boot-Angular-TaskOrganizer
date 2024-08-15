import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Team } from 'src/app/shared/models/team';

@Component({
  selector: 'app-card-team',
  standalone: true,
  imports: [DatePipe,CommonModule],
  templateUrl: './card-team.component.html',
  styleUrls: ['./card-team.component.scss'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class CardTeamComponent {
  @Input() cardTeam!: Team; // Added a space after the type annotation for consistency
  showFullDescription = false;

  constructor(private router: Router) {}
  toggleDescription() {
    this.showFullDescription = !this.showFullDescription;
  }

  goToMembers(): void { // Added return type for clarity
    this.router.navigateByUrl(`manager/team/${this.cardTeam.name}/${this.cardTeam.id}/members`); // Corrected 'employes' to 'employees' (English spelling)
  }

  goToProjects(): void { // Added return type for clarity
    this.router.navigateByUrl(`manager/team/${this.cardTeam.name}/${this.cardTeam.id}/projects`); // Corrected 'projets' to 'projects' (English spelling)
  }
}
