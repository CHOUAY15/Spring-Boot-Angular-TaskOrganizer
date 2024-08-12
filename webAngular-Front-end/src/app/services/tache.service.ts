import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tache } from '../model/tache';
import { TacheSubmitData } from '../model/tacheSubmitData';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class TacheService {
  empId:number;
  constructor(
    private http: HttpClient,authService:AuthService
  ) {this.empId=authService.getCurrentUser().person.id}

  getTachesByProjet(Id: string): Observable<Tache[]> {
    return this.http.get<Tache[]>(`http://localhost:4000/api/taches/prjtId/${Id}`);
  }
  addTache(tache:TacheSubmitData ,prjtId:string): Observable<any> {
    return this.http.post(`http://localhost:4000/api/taches/prjtId/${prjtId}`, tache);
  }
  getTachesByEmploye(): Observable<Tache[]> {
    return this.http.get<Tache[]>(`http://localhost:4000/api/taches/empId/${this.empId}`);
  }
  updateTacheStatus(tacheId: number, newStatut: string): Observable<Tache> {
    return this.http.put<Tache>(`http://localhost:4000/taches`, { statut: newStatut,id:tacheId });
  }
  getTacheById(Id: string): Observable<Tache> {
    return this.http.get<Tache>(`http://localhost:4000/api/taches/id/${Id}`);

  }
  
}
