import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Commentaire, Reponses } from '../model/commentaire';

export interface ReponsesSubmite {
  texte: string;
  commentaireId: number;
  idChef:number;
}

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:4000/api'; // Remplacez par l'URL de votre API

  constructor(private http: HttpClient) {}

  getComments(tacheId: string): Observable<Commentaire[]> {
    return this.http.get<Commentaire[]>(`${this.apiUrl}/commentaires/tacheId/${tacheId}`);
  }
  addReponseToCommentaire(reponse: ReponsesSubmite): Observable<Reponses> {
    return this.http.post<Reponses>(`${this.apiUrl}/reponses`, reponse);
  }
}
