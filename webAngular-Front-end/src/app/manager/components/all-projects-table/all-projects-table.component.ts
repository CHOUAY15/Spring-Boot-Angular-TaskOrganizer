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
import { Router } from '@angular/router';
import { ProjectService } from 'src/app/core/services/project.service';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-all-projects-table',
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
    DatePipe

  ],
  templateUrl: './all-projects-table.component.html',
  styleUrl: './all-projects-table.component.scss'
})
export class AllProjectsTableComponent implements OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() projects: Project[] = [];
  @Input() teamId: string = '';
  @Output() addProject = new EventEmitter<void>();
  @Output() projectDeleted = new EventEmitter<void>();
  displayedColumns: string[] = ['titre','teamName','description', 'dateDebut', 'dateFin', 'tâches', 'etatAvancement', 'actions'];
  dataSource: MatTableDataSource<Project>;
  showConfirmModal = false;
  projectToDelete: number | null = null;

  constructor(
    private router: Router,
    private projectService: ProjectService
  ) {
    this.dataSource = new MatTableDataSource<Project>([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['projects']) {
      this.dataSource.data = this.projects;
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

  goToTasks(project: Project): void {
    this.router.navigateByUrl(`manager/projects/${this.teamId}/${project.name}/${project.id}/tasks`);
  }

  deleteProject(projectId: number): void {
    this.projectToDelete = projectId;
    this.showConfirmModal = true;
  }

  cancelDelete(): void {
    this.showConfirmModal = false;
    this.projectToDelete = null;
  }

  confirmDelete(): void {
    if (this.projectToDelete !== null) {
      this.projectService.delete(this.projectToDelete).subscribe({
        next: (response) => {
          console.log('Project deleted successfully', response);
          this.dataSource.data = this.dataSource.data.filter((project) => project.id !== this.projectToDelete);
          this.dataSource._updateChangeSubscription();
          this.showConfirmModal = false;
          this.projectToDelete = null;
          this.projectDeleted.emit();
        },
        error: (error) => {
          console.error('There was an error deleting the project!', error);
          this.showConfirmModal = false;
          this.projectToDelete = null;
        }
      });
    }
  }
}