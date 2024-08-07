import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListTachesComponent } from '../list-taches/list-taches.component';

@Component({
  selector: 'app-taches',
  standalone: true,
  imports: [ListTachesComponent],
  templateUrl: './taches.component.html',
  styleUrl: './taches.component.scss'
})
export class TachesComponent implements OnInit {

  constructor(private route: ActivatedRoute){

  }

  nomProjet:string;


  ngOnInit(): void {
    const titreProjet = this.route.snapshot.params["nomProjet"];
    this.nomProjet=titreProjet;
  }

}
