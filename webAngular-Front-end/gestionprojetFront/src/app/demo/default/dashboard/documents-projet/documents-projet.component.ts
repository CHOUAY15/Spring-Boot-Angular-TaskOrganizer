import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Deliverable, ProjectWithOpenState } from 'src/app/model/projetSubmitData';
import { ProjetService } from 'src/app/services/projet.service';



@Component({
  selector: 'app-documents-projet',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './documents-projet.component.html',
  styleUrl: './documents-projet.component.scss'
})
export class DocumentsProjetComponent implements OnInit {
  projets$: Observable<ProjectWithOpenState[]>;

  constructor(private projetService: ProjetService) {}

  ngOnInit(): void {
    this.projets$ = this.projetService.getProjetsByChef();
    console.log(this.projets$);
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
