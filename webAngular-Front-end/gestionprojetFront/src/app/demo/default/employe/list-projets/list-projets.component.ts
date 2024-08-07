import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Deliverable, ProjectWithOpenState } from 'src/app/model/projetSubmitData';
import { ProjetService } from 'src/app/services/projet.service';


@Component({
  selector: 'app-list-projets',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './list-projets.component.html',
  styleUrl: './list-projets.component.scss'
})
export class ListProjetsComponent implements OnInit{
  projets$: Observable<ProjectWithOpenState[]>;

  constructor(private projetService: ProjetService, private route:Router) {}

  ngOnInit(): void {
    this.projets$ = this.projetService.getProjetByTeam("10");
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
  goToTaches(): void {
    this.route.navigateByUrl('taches')

   
  }

 

}
