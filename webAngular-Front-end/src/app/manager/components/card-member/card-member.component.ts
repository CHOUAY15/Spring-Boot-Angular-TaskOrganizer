import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MemberService } from 'src/app/core/services/member.service';
import { Member } from 'src/app/shared/models/member';

@Component({
  selector: 'app-card-member',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-member.component.html',
  styleUrls: ['./card-member.component.scss']
})
export class CardMemberComponent implements OnInit {
  employee: Member | undefined;

  constructor(
    private employeeService: MemberService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const memberId = params['id'];
      if (memberId) {
        this.loadEmployee(memberId);
      }
    });
  }

  loadEmployee(employeeId: string): void {
    this.employeeService.getMemberById(employeeId).subscribe({
      next: (employee: Member) => {
        this.employee = employee;
      },
      error: (error: any) => {
        console.error('Error fetching employee:', error);
        // Handle error (e.g., show error message to the user)
      }
    });
  }
}
