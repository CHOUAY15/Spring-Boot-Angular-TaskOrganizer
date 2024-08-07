import { CommonModule, DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
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
export class ProjetTableComponent implements OnInit, AfterViewInit {
  showDialog = false;
  displayedColumns: string[] = ['titre', 'description', 'dateDebut', 'dateFin', 'tâches', 'actions'];
  dataSource: MatTableDataSource<Projet>;
  equipeId: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router: Router,
    private projetService: ProjetService,
    private route: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource<Projet>([]);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.equipeId = params['id'];
      if (this.equipeId) {
        this.loadProjets(this.equipeId);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadProjets(equipeId: string) {
    this.projetService.getProjetsByTeamId(equipeId).subscribe({
      next: (projets) => {
        this.dataSource.data = projets;
      },
      error: (error) => {
        console.error('Error fetching projects:', error);
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToTaches(projet: Projet): void {
    this.router.navigateByUrl(`projets/${this.equipeId}/${projet.nom}/${projet.id}/taches`);
  }

  handleClose() {
    this.showDialog = false;
  }

  ajouterProjet() {
    this.showDialog = true;
  }
  deleteProjet(projetId: number) {
    this.projetService.deleteProjet(projetId).subscribe({
      next: (response) => {
        console.log('Project deleted successfully', response);
        this.dataSource.data = this.dataSource.data.filter(projet => projet.id !== projetId);
        this.dataSource._updateChangeSubscription();
      },
      error: (error) => {
        console.error('There was an error deleting the project!', error);
      }
    });
  }

  onProjectAdded(newProject: Projet) {
    console.log('New project received:', newProject);
    this.dataSource.data = [...this.dataSource.data, newProject];
    this.dataSource._updateChangeSubscription(); // Notify the table that the data has changed
    this.showDialog = false;
  }
}
