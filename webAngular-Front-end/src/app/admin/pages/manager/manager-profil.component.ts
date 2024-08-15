import { Component, OnInit } from '@angular/core';
import { CardMemberComponent } from '../../components/card-member/card-member.component';
import { Manager } from 'src/app/shared/models/manager';
import { ManagerService } from 'src/app/core/services/manager.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manager-profil',
  standalone: true,
  imports: [CardMemberComponent],
  templateUrl: './manager-profil.component.html',
  styleUrl: './manager-profil.component.scss'
})
export class ManagerProfilComponent implements OnInit {
  employee: Manager | undefined;
  constructor(
    private employeeService: ManagerService,
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

  loadEmployee(employeeId: number): void {
    this.employeeService.getManagerById(employeeId).subscribe({
      next: (employee: Manager) => {
        console.log(employee)
        this.employee = employee;
      },
      error: (error: any) => {
        console.error('Error fetching employee:', error);
        // Handle error (e.g., show error message to the user)
      }
    });
  }

}
