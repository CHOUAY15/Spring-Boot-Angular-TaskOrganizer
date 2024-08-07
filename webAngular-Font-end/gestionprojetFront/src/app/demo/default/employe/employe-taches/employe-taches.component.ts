import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, DragDropModule, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CartTacheComponent } from '../../../../demo/default/dashboard/cart-tache/cart-tache.component';
import { TacheService } from 'src/app/services/tache.service';
import { ActivatedRoute } from '@angular/router';
import { Tache } from 'src/app/model/tache';

type Statut = 'A_Faire' | 'En_Cours' | 'Termine';

@Component({
  selector: 'app-employe-taches',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule, CartTacheComponent, DragDropModule],
  templateUrl: './employe-taches.component.html',
  styleUrls: ['./employe-taches.component.scss']
})


export class EmployeTachesComponent implements OnInit {



  tachesAFaire: Tache[] = [];
  tachesEnCours: Tache[] = [];
  tachesTerminees: Tache[] = [];
  nextId = 1;
  statuts: Statut[] = ['A_Faire', 'En_Cours', 'Termine'];
  prjtId: string = '';
  rapportOpen:boolean;

  constructor(
    private tacheService: TacheService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.prjtId = params['id'];
      this.loadTaches(this.prjtId);
    });
  }

  loadTaches(prjtId: string) {
    this.tacheService.getTachesByEmploye().subscribe({
      next: (taches) => {
        this.tachesAFaire = taches.filter((tache) => tache.statut === 'A_Faire');
        this.tachesEnCours = taches.filter((tache) => tache.statut === 'En_Cours');
        this.tachesTerminees = taches.filter(tache => tache.statut === 'Termine');
        this.rapportOpen = this.tachesAFaire.length === 0 && 
        this.tachesEnCours.length === 0 && 
        this.tachesTerminees.length >=1;
       
},
      error: (error) => {
        console.error('Error fetching taches:', error);
      }
    });
  }

  getTachesList(statut: Statut): Tache[] {
    switch (statut) {
      case 'A_Faire':
        return this.tachesAFaire;
      case 'En_Cours':
        return this.tachesEnCours;
      case 'Termine':
        return this.tachesTerminees;
    }
  }

  drop(event: CdkDragDrop<Tache[]>) {
    if (event.previousContainer !== event.container) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const tache = event.container.data[event.currentIndex];
      const newStatut = this.getStatutFromListId(event.container.id);
      tache.statut = newStatut;
      this.updateTacheStatus(tache.id, newStatut);
    }
  }

  getStatutFromListId(listId: string): Statut {
    switch (listId) {
      case 'todoList':
        return 'A_Faire';
      case 'inProgressList':
        return 'En_Cours';
      case 'doneList':
        return 'Termine';
      default:
        return 'A_Faire';
    }
  }
  updateTacheStatus(tacheId: number, newStatut: Statut) {
    this.tacheService.updateTacheStatus(tacheId, newStatut).subscribe({
      next: (updatedTache) => {
        this.rapportOpen = this.tachesAFaire.length === 0 && 
        this.tachesEnCours.length === 0 && 
        this.tachesTerminees.length >=1;
        console.log('Rapport Open:', this.rapportOpen); 
        console.log('taille :',this.tachesAFaire.length ); 
        console.log('taille :',   this.tachesEnCours.length ); 
        console.log('taille termine:',   this.tachesTerminees.length); 
        console.log('Tache status updated successfully:', updatedTache);
      },
      error: (error) => {
        console.error('Error updating tache status:', error);
        this.loadTaches(this.prjtId);
      }
    });
  }
  importFile(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Handle the file upload here
      console.log('File selected:', file.name);
      // You can add your file upload logic here
    }
  }
}