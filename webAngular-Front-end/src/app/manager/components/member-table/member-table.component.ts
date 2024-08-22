import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Member } from 'src/app/shared/models/member';

@Component({
  selector: 'app-member-table',
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
  templateUrl: './member-table.component.html',
  styleUrls: ['./member-table.component.scss'] // Corrected from 'styleUrl' to 'styleUrls'
})
export class MemberTableComponent implements OnChanges, AfterViewInit {
  @Input() members: Member[] = []; // Renamed 'employes' to 'members' for consistency
  @Input() teamId: string = ''; // Renamed 'equipeId' to 'teamId' for consistency
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['avatar', 'nom', 'prenom','teamName', 'cin', 'profil']; // Translated column names to English
  dataSource: MatTableDataSource<Member>;

  constructor(private router: Router) {
    this.dataSource = new MatTableDataSource<Member>([]);
  }

  ngOnChanges(changes: SimpleChanges): void { // Added return type for clarity
    if (changes['members']) { // Changed 'employes' to 'members' for consistency
      this.dataSource.data = this.members;
      this.dataSource._updateChangeSubscription();
    }
  }

  ngAfterViewInit(): void { // Added return type for clarity
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void { // Added return type for clarity
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  viewProfile(member: Member): void { // Renamed 'voirProfil' to 'viewProfile' and 'employe' to 'employee' for consistency
    this.router.navigateByUrl(`manager/member/${member.id}`); // Changed 'chef/employe' to 'manager/employee' for consistency
  }
}
