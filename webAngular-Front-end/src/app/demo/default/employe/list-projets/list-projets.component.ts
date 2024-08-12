import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Deliverable, ProjectWithOpenState } from 'src/app/model/projetSubmitData';
import { AuthService } from 'src/app/services/auth.service';
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
  eqpId:number;

  constructor(private projetService: ProjetService, private route:Router,private authService:AuthService) {}

  ngOnInit(): void {
    this.eqpId=this.authService.getCurrentUser().person.equipe.id;
    this.projets$ = this.projetService.getProjetByTeam(String(this.eqpId));
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
    this.route.navigateByUrl('employee/taches')

   
  }

 

}
