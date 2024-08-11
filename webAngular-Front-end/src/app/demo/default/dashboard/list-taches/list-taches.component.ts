import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { CartTacheComponent } from '../cart-tache/cart-tache.component';
import { DialogeTacheComponent } from '../dialoge-tache/dialoge-tache.component';
import { Tache } from 'src/app/model/tache';
import { ActivatedRoute } from '@angular/router';

type Statut = 'A_Faire' | 'En_Cours' | 'Termine';

@Component({
  selector: 'app-list-taches',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatButtonModule, CartTacheComponent, DialogeTacheComponent],
  templateUrl: './list-taches.component.html',
  styleUrls: ['./list-taches.component.scss']
})
export class ListTachesComponent implements OnInit {
  @Input() taches: Tache[] = [];
  @Input() prjtId: string;

  tachesAFaire: Tache[] = [];
  tachesEnCours: Tache[] = [];
  tachesTerminees: Tache[] = [];
  nextId = 1;
  statuts: Statut[] = ['A_Faire', 'En_Cours', 'Termine'];

  showDialog = false;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.tachesAFaire = this.taches
      .filter((tache) => tache.statut === 'A_Faire')
      .sort((a, b) => {
        const priorityOrder = { haute: 1, moyenne: 2, basse: 3 };
        return priorityOrder[a.priorite] - priorityOrder[b.priorite];
      });
    this.tachesEnCours = this.taches
      .filter((tache) => tache.statut === 'En_Cours')
      .sort((a, b) => {
        const priorityOrder = { haute: 1, moyenne: 2, basse: 3 };
        return priorityOrder[a.priorite] - priorityOrder[b.priorite];
      });
      this.tachesTerminees = this.taches
      .filter((tache) => tache.statut === 'Termine')
      .sort((a, b) => {
        const priorityOrder = { haute: 1, moyenne: 2, basse: 3 };
        return priorityOrder[a.priorite] - priorityOrder[b.priorite];
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

  ajouterTache(statut: Statut) {
    this.showDialog = true;
  }

  handleClose() {
    this.showDialog = false;
  }
  onAddTache(newTache: Tache) {
    console.log('New project received:', newTache);
    this.tachesAFaire = [...this.tachesAFaire, newTache];
    // this.dataSource._updateChangeSubscription();
    this.showDialog = false;
  }
}
