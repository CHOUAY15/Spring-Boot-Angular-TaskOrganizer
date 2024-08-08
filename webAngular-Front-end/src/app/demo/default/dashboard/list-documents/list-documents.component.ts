import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Deliverable, ProjectWithOpenState } from 'src/app/model/projetSubmitData';
import { ProjetService } from 'src/app/services/projet.service';

@Component({
  selector: 'app-list-documents',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './list-documents.component.html',
  styleUrl: './list-documents.component.scss'
})
export class ListDocumentsComponent implements OnInit {
  filteredProjets: any[] = []; // Array to hold filtered employees
  filterText: string = ''; // To hold the filter text

  @Input() projets: ProjectWithOpenState[];

  constructor(private projetService: ProjetService) {}
  ngOnInit(): void {
    this.filteredProjets = [...this.projets];
  }


  filerProjets() {
    if (!this.filterText) {
      this.filteredProjets = [...this.projets];
    } else {
      this.filteredProjets = this.projets.filter(prjt => 
        prjt.nom.toLowerCase().includes(this.filterText.toLowerCase()) ||
        prjt.dateDebut.toLowerCase().includes(this.filterText.toLowerCase()) 
       
      );
    }
  }

  viewFile(livrable: Deliverable) {
    this.projetService.getFileUrl(livrable.path).subscribe(
      (url: string) => {
        window.open(url, '_blank');
      },
      (error) => {
        console.error('Error getting file URL:', error);
        // Handle error (e.g., show an error message to the user)
      }
    );
  }
  toggleProjet(projet: ProjectWithOpenState): void {
    (projet as any).isOpen = !(projet as any).isOpen;
  }
  ajouterPDF(projet: ProjectWithOpenState, event: Event): void {
    event.stopPropagation(); // Empêche le toggle du projet
    // Logique pour ajouter un nouveau PDF au projet
    console.log('Ajouter un PDF au projet:', projet.nom);
  }

  supprimerDocument(projet: ProjectWithOpenState, doc: Deliverable): void {
    // Logique pour supprimer le document du projet
    console.log('Supprimer le document:', doc.nom, 'du projet:', projet.nom);
  }
}
