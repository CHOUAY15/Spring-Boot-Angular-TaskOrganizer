import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { EmployeService } from 'src/app/services/employe.service';
import { Employee } from 'src/app/model/employe';

interface TeamMembre {
  nom: string;
  position: string;
  sexe:string
}

@Component({
  selector: 'app-team-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  animations: [
    trigger('fadeAnimation', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('hidden => visible', [
        style({ opacity: 0 }),
        animate('1s ease-in-out', style({ opacity: 1 }))
      ]),
      transition('visible => hidden', [
        animate('1s ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LandingPageComponent implements OnInit, OnDestroy {

  teamMembers: TeamMembre[] = [];
  currentIndex = 0;
  visibleMembers: TeamMembre[] = [];
  autoSlideInterval: any;
  transitionActive = false;

  constructor(private employeeService: EmployeService) {}

  ngOnInit() {
    this.loadEmployees("10");
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.stopAutoSlide();  // Clean up the auto-slide interval when the component is destroyed
  }

  loadEmployees(equipeId: string) {
    this.employeeService.getEmployeesByTeamId(equipeId).subscribe({
      next: (employees: Employee[]) => {
        this.teamMembers = employees.map(employee => ({
          nom: employee.nom,
          position: employee.position,
          sexe:employee.sexe
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
    setTimeout(() => { this.transitionActive = false; }, 500);
  }

  prevSlide() {
    if (this.transitionActive) return;
    this.transitionActive = true;
    this.currentIndex = (this.currentIndex - 1 + this.teamMembers.length) % this.teamMembers.length;
    this.updateVisibleMembers();
    this.resetAutoSlide();
    setTimeout(() => { this.transitionActive = false; }, 500);
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
