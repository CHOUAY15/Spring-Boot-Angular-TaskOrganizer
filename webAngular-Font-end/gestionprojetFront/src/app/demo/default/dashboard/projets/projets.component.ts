import { Component, OnInit } from '@angular/core';
import { ProjetTableComponent } from '../projet-table/projet-table.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-projets',
  standalone: true,
  imports: [ProjetTableComponent],
  templateUrl: './projets.component.html',
  styleUrl: './projets.component.scss'
})
export class ProjetsComponent implements OnInit{
  nomEquipe!:string;

  constructor(private route: ActivatedRoute){}


  ngOnInit(): void {
     const equipeNom=this.route.snapshot.params['nomEquipe'];

    this.nomEquipe=equipeNom;
  }


}
