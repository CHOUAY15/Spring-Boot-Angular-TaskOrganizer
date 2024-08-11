import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CardEquipe } from 'src/app/model/card-equipe';

@Component({
  selector: 'app-card-equipe',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './card-equipe.component.html',
  styleUrl: './card-equipe.component.scss'
})
export class CardEquipeComponent {

  @Input() cardEquipe!:CardEquipe

  constructor(private router:Router){}




  goToEmployes():void {
    this.router.navigateByUrl(`chef/equipe/${this.cardEquipe.nom}/${this.cardEquipe.id}/employes`);
  }
  
  goToProjets():void {
    this.router.navigateByUrl(`chef/equipe/${this.cardEquipe.nom}/${this.cardEquipe.id}/projets`);
  }



}
