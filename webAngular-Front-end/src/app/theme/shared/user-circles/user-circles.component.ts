import { Component, Input, OnInit } from '@angular/core';
import { MemberService } from 'src/app/core/services/member.service';
import { Member } from 'src/app/shared/models/member';

@Component({
  selector: 'app-user-circles',
  templateUrl: './user-circles.component.html',
  styleUrls: ['./user-circles.component.scss']
})
export class UserCirclesComponent implements OnInit {
  @Input() equipeId: string;
  users: Member[] = [];
  displayedUsers: Member[] = [];
  remainingUsers: number = 0;

  constructor(private employeService: MemberService) {}

  ngOnInit() {
    this.loadEmployes();
  }

  loadEmployes() {
    this.employeService.findByTeam(this.equipeId).subscribe(
      (employees: Member[]) => {
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