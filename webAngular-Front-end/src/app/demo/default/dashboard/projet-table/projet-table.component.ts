import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, Input, OnChanges, Output, EventEmitter, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogProjetComponent } from '../dialog-projet/dialog-projet.component';
import { Projet } from 'src/app/model/projet';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-projet-table',
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
    DialogProjetComponent,
    DatePipe
  ],
  templateUrl: './projet-table.component.html',
  styleUrl: './projet-table.component.scss'
})
export class ProjetTableComponent implements OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() projets: Projet[] = [];
  @Input() equipeId: string = '';
  @Output() addProject = new EventEmitter<void>();
  
  displayedColumns: string[] = ['titre', 'description', 'dateDebut', 'dateFin', 'tâches', 'etatAvancement', 'actions'];
  dataSource: MatTableDataSource<Projet>;

  showConfirmModal = false;
  projectToDelete: number | null = null;

  constructor(
    private router: Router,
    private projetService: ProjetService,
  ) {
    this.dataSource = new MatTableDataSource<Projet>([]);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['projets']) {
      this.dataSource.data = this.projets;
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

  goToTaches(projet: Projet): void {
    this.router.navigateByUrl(`chef/projets/${this.equipeId}/${projet.nom}/${projet.id}/taches`);
  }

  deleteProjet(projetId: number) {
    this.projectToDelete = projetId;
    this.showConfirmModal = true;
  }

  cancelDelete() {
    this.showConfirmModal = false;
    this.projectToDelete = null;
  }

  confirmDelete() {
    if (this.projectToDelete !== null) {
      this.projetService.deleteProjet(this.projectToDelete).subscribe({
        next: (response) => {
          console.log('Project deleted successfully', response);
          this.dataSource.data = this.dataSource.data.filter((projet) => projet.id !== this.projectToDelete);
          this.dataSource._updateChangeSubscription();
          this.showConfirmModal = false;
          this.projectToDelete = null;
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