import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { TeamInfoCardComponent } from '../../components/team-info-card/team-info-card.component';
import { Team } from 'src/app/shared/models/team';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Member } from 'src/app/shared/models/member';
import { MemberService } from 'src/app/core/services/member.service';
import { TeamService } from 'src/app/core/services/team.service';




@Component({
  selector: 'app-team-carousel',
  standalone: true,
  imports: [CommonModule, DatePipe, TeamInfoCardComponent],
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', [style({ opacity: 0 }), animate('1s ease-in-out', style({ opacity: 1 }))]),
      transition('visible => hidden', [animate('1s ease-in-out', style({ opacity: 0 }))])
    ])
  ]
})
export class TeamComponent implements OnInit, OnDestroy {
  teamMembers: any[] = [];
  equipe: Team;
  currentIndex = 0;
  visibleMembers: Member[] = [];
  autoSlideInterval: any;
  transitionActive = false;

  constructor(
    private employeeService: MemberService,
    private authService: AuthenticationService,
    private teamService:TeamService
  ) {}

  ngOnInit() {
   this.teamService.findById(this.authService.getCurrentUser().person.team.id).subscribe(
      team=> this.equipe=team
    )
    this.loadEmployees(String(this.authService.getCurrentUser().person.team.id));

    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide(); // Clean up the auto-slide interval when the component is destroyed
  }

  loadEmployees(equipeId: string) {
    this.employeeService.findByTeam(equipeId).subscribe({
      next: (employees: Member[]) => {
        this.teamMembers = employees.map((employee) => ({
          name: employee.name,
          position: employee.position,
          gender: employee.gender,
          email:employee.email
        }));
        this.updateVisibleMembers();
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        // Handle error (e.g., show error message to user)
      }
    });
  }

  updateVisibleMembers() {
    if (this.teamMembers.length > 0) {
      this.visibleMembers = [
        this.teamMembers[(this.currentIndex - 1 + this.teamMembers.length) % this.teamMembers.length],
        this.teamMembers[this.currentIndex],
        this.teamMembers[(this.currentIndex + 1) % this.teamMembers.length]
      ];
    }
  }

  nextSlide() {
    if (this.transitionActive) return;
    this.transitionActive = true;
    this.currentIndex = (this.currentIndex + 1) % this.teamMembers.length;
    this.updateVisibleMembers();
    this.resetAutoSlide();
    setTimeout(() => {
      this.transitionActive = false;
    }, 500);
  }

  prevSlide() {
    if (this.transitionActive) return;
    this.transitionActive = true;
    this.currentIndex = (this.currentIndex - 1 + this.teamMembers.length) % this.teamMembers.length;
    this.updateVisibleMembers();
    this.resetAutoSlide();
    setTimeout(() => {
      this.transitionActive = false;
    }, 500);
  }

  startAutoSlide() {
    this.autoSlideInterval = setInterval(() => this.nextSlide(), 3000);
  }

  stopAutoSlide() {
    clearInterval(this.autoSlideInterval);
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  onSlideClick(index: number) {
    if (this.transitionActive) return;
    this.currentIndex = index;
    this.updateVisibleMembers();
    this.resetAutoSlide();
  }
}
