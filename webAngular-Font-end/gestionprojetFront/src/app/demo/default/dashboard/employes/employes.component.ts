import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeTableComponent } from '../employee-table/employee-table.component';

@Component({
  selector: 'app-employes',
  standalone: true,
  imports: [EmployeeTableComponent],
  templateUrl: './employes.component.html',
  styleUrl: './employes.component.scss'
})
export class EmployesComponent  implements OnInit{
  constructor(private route: ActivatedRoute){}

  idEquipe!:number;
  nomEquipe!:string;



  ngOnInit(): void {
    const equipeId=this.route.snapshot.params['id'];
    const equipeNom=this.route.snapshot.params['nomEquipe'];

    this.idEquipe=equipeId;
    this.nomEquipe=equipeNom;

  }

  

}
