import { Component, OnInit } from '@angular/core';
import { CardMemberComponent } from "../../components/card-member/card-member.component";
import { MemberService } from 'src/app/core/services/member.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/shared/models/member';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [CardMemberComponent],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent implements OnInit {
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
