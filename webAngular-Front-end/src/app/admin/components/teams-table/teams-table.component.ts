import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DialogAddTeamComponent } from './dialog-add-team/dialog-add-team.component';
import { Team } from 'src/app/shared/models/team';
import { TeamService } from 'src/app/core/services/team.service';
import { Router } from '@angular/router';
import { DialogUpdateTeamComponent } from "./dialog-update-team/dialog-update-team.component";

@Component({
  selector: 'app-team-table',
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
    MatIconModule,
    DatePipe,
    DialogAddTeamComponent,
    DialogUpdateTeamComponent
],
  templateUrl: './teams-table.component.html',
  styleUrls: ['./teams-table.component.scss']
})
export class TeamsTableComponent implements OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() teams: Team[] = [];
  @Output() addTeam = new EventEmitter<void>();
  @Output() teamDeleted = new EventEmitter<void>();
  displayedColumns: string[] = ['nom', 'description', 'dateCreation', 'nmbrMembres', 'manager', 'nomSection', 'actions'];
  dataSource: MatTableDataSource<Team>;
  showConfirmModal = false;
  teamToDelete: number | null = null;
  showDialogUpdate = false;
  teamToUpdate: Team | null = null;

  constructor(
    private teamService: TeamService
  ) {
    this.dataSource = new MatTableDataSource<Team>([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['teams']) {
      this.dataSource.data = this.teams;
      this.dataSource._updateChangeSubscription();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteTeam(teamId: number): void {
    this.teamToDelete = teamId;
    this.showConfirmModal = true;
  }

  cancelDelete(): void {
    this.showConfirmModal = false;
    this.teamToDelete = null;
  }

  confirmDelete(): void {
    if (this.teamToDelete !== null) {
      this.teamService.delete(this.teamToDelete).subscribe({
        next: (response) => {
          console.log('Team deleted successfully', response);
          this.dataSource.data = this.dataSource.data.filter((team) => team.id !== this.teamToDelete);
          this.dataSource._updateChangeSubscription();
          this.showConfirmModal = false;
          this.teamToDelete = null;
          this.teamDeleted.emit();
        },
        error: (error) => {
          console.error('There was an error deleting the team!', error);
          this.showConfirmModal = false;
          this.teamToDelete = null;
        }
      });
    }
  }
  update(team: Team) {
    this.teamToUpdate = team;
    this.showDialogUpdate = true;
  }

  onDialogClose() {
    this.showDialogUpdate = false;
    this.teamToUpdate = null;
  }

  onTeamUpdated(updatedTeam: Team) {
    const index = this.dataSource.data.findIndex(t => t.id === updatedTeam.id);
    if (index !== -1) {
      this.dataSource.data[index] = updatedTeam;
      this.dataSource._updateChangeSubscription();
    }
    this.showDialogUpdate = false;
    this.teamToUpdate = null;
  }
  
}