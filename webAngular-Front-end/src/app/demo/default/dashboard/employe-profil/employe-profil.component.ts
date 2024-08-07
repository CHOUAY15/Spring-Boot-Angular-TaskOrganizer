import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/model/employe';
import { EmployeService } from 'src/app/services/employe.service';

@Component({
  selector: 'app-employe-profil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employe-profil.component.html',
  styleUrl: './employe-profil.component.scss'
})
export class EmployeProfilComponent implements OnInit{
  employee: Employee | undefined;

  constructor(private employeeService: EmployeService,private route: ActivatedRoute ){


  }





  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const equipeId = params['id'];
      if (equipeId) {
        this.loadEmploye(equipeId);
      }
    });
  }

  loadEmploye(employeId :string){
    this.employeeService.getEmployeeByID(employeId).subscribe({
      next: (employee) => {
        this.employee = employee;
      },
      error: (error) => {
        console.error('Error fetching employee:', error);
        // Handle error (e.g., show error message to user)
      }
    });
  }


  }


