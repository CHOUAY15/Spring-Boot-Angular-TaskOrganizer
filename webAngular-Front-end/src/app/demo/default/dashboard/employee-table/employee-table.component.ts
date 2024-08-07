import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Employee } from 'src/app/model/employe';

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
    FormsModule,
    MatIconModule
  ],
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnChanges, AfterViewInit {
  // proprietes
  @Input() employes: Employee[] = [];
  @Input() equipeId: string = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['avatar', 'nom', 'prenom', 'cin', 'profil'];
  dataSource: MatTableDataSource<Employee>;

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource<Employee>([]);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['employes']) {
      this.dataSource.data = this.employes;
      this.dataSource._updateChangeSubscription();
    }
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
    this.router.navigateByUrl(`employe/${employee.id}`);
  }
}
