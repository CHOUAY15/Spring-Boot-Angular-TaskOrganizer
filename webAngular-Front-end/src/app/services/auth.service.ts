import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CardEquipe } from '../model/card-equipe';

 export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  id: number;
  role: string;
  person: {
    id: number;
    nom: string;
    prenom: string;
    age: number;
    telephone: string;
    email: string;
    adresse: string;
    avatar: string | null;
    cin: string;
    sexe: string;
    departementNom: string;
    equipe:CardEquipe;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<LoginResponse | null>;
  public currentUser: Observable<LoginResponse | null>;
  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
      })
    );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user !== null && user.role === role;
  }

  getToken(): string | null {
    const user = this.getCurrentUser();
    return user ? user.accessToken : null;
  }
  getUserRole(): string {
    const user = this.getCurrentUser();
    return user ? user.role : '';
  }

}
