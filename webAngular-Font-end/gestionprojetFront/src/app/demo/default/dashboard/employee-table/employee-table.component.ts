import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from 'src/app/model/employe';
import { EmployeService } from 'src/app/services/employe.service';



@Component({
  selector: 'app-employee-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,MatIconModule
  ],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['avatar', 'nom', 'prenom', 'cin', 'profil'];
  dataSource: MatTableDataSource<Employee>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router ,   private employeeService: EmployeService ,  private route: ActivatedRoute) {
    this.dataSource = new MatTableDataSource<Employee>([]);
    
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const equipeId = params['id'];
      if (equipeId) {
        this.loadEmployees(equipeId);
      }
    });
  }

  loadEmployees(equipeId: string) {
    this.employeeService.getEmployeesByTeamId(equipeId).subscribe({
      next: (employees) => {
        this.dataSource.data = employees;
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
        // Handle error (e.g., show error message to user)
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  voirProfil(employee: Employee) {
    this.router.navigateByUrl(`employe/${employee.id}`)
   
  }

 

  
}