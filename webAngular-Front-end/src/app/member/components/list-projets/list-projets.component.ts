import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ProjectService } from 'src/app/core/services/project.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { Project } from 'src/app/shared/models/project';
import { Deliverable } from 'src/app/shared/models/deliverable';


@Component({
  selector: 'app-list-projets',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './list-projets.component.html',
  styleUrl: './list-projets.component.scss'
})
export class ListProjetsComponent implements OnInit{
  projets$: Observable<Project[]>;
  eqpId:number;

  constructor(private projetService: ProjectService, private route:Router,private authService:AuthenticationService) {}

  ngOnInit(): void {
    this.eqpId=this.authService.getCurrentUser().person.team.id;
    this.projets$ = this.projetService.findByTeam(String(this.eqpId));
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
  toggleProjet(projet: Project): void {
    (projet as any).isOpen = !(projet as any).isOpen;
  }
  goToTaches(projet:Project): void {
    this.route.navigateByUrl(`member/${projet.id}/taches`)

   
  }

 

}
