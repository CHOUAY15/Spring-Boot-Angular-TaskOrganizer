import { Injectable } from '@angular/core';
import { CardEquipe } from '../model/card-equipe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  constructor(private http: HttpClient) {}
  getAllEquipes(): Observable<CardEquipe[]> {
    return this.http.get<CardEquipe[]>('http://localhost:4000/equipes/chefId/12');
}
}
