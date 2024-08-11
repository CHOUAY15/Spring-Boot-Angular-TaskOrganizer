import { Injectable } from '@angular/core';
import { CardEquipe } from '../model/card-equipe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService, LoginResponse } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class EquipeService {
  user: LoginResponse;
  constructor(private http: HttpClient,authService:AuthService) {
    this.user=authService.getCurrentUser();
  }
  getAllEquipes(): Observable<CardEquipe[]> {
    return this.http.get<CardEquipe[]>(`http://localhost:4000/api/equipes/chefId/${this.user.person.id}`);
  }
}
