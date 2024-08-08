import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/model/employe';
import { EmployeService } from '../services/employe.service';

@Component({
  selector: 'app-user-circles',
  templateUrl: './user-circles.component.html',
  styleUrls: ['./user-circles.component.scss']
})
export class UserCirclesComponent implements OnInit {
  @Input() equipeId: string;
  users: Employee[] = [];
  displayedUsers: Employee[] = [];
  remainingUsers: number = 0;

  constructor(private employeService: EmployeService) {}

  ngOnInit() {
    this.loadEmployes();
  }

  loadEmployes() {
    this.employeService.getEmployeesByTeamId(this.equipeId).subscribe(
      (employees: Employee[]) => {
        this.users = employees;
        this.updateDisplayedUsers();
      },
      error => {
        console.error('Error loading employees', error);
      }
    );
  }

  updateDisplayedUsers() {
    if (this.users.length <= 3) {
      this.displayedUsers = this.users;
      this.remainingUsers = 0;
    } else {
      this.displayedUsers = this.users.slice(0, 3);
      this.remainingUsers = this.users.length - 3;
    }
  }
}