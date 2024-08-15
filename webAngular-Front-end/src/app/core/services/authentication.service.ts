import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, timer } from 'rxjs';
import { Person } from 'src/app/shared/models/person';

export interface LoginResponse {
  accessToken: string;
  tokenType: string;
  id: number;
  role: string;
  person: Person;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<LoginResponse | null>;
  public currentUser: Observable<LoginResponse | null>;
  private apiUrl = 'http://localhost:4000';
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.initTokenExpirationCheck();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((response) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        this.startTokenExpirationTimer(response.accessToken);
      })
    );
  }
  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.stopTokenExpirationTimer();
    this.router.navigate(['/guest/login']);
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

  private initTokenExpirationCheck() {
    const user = this.getCurrentUser();
    if (user && user.accessToken) {
      this.startTokenExpirationTimer(user.accessToken);
    }
  }

  private startTokenExpirationTimer(token: string) {
    this.stopTokenExpirationTimer();
    const expirationDate = this.getTokenExpirationDate(token);
    if (expirationDate) {
      const expiresIn = expirationDate.getTime() - Date.now();
      this.tokenExpirationTimer = timer(expiresIn).subscribe(() => {
        this.logout();
      });
    }
  }

  private stopTokenExpirationTimer() {
    if (this.tokenExpirationTimer) {
      this.tokenExpirationTimer.unsubscribe();
    }
  }

  private getTokenExpirationDate(token: string): Date | null {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      if (decoded.exp === undefined) {
        return null;
      }
      const date = new Date(0);
      date.setUTCSeconds(decoded.exp);
      return date;
    } catch (error) {
      return null;
    }
  }

  refreshToken(): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/refresh-token`, {}).pipe(
      tap((response) => {
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        this.startTokenExpirationTimer(response.accessToken);
      })
    );
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;
    const expirationDate = this.getTokenExpirationDate(token);
    return expirationDate ? expirationDate.getTime() <= Date.now() : true;
  }

  checkPasswordStatus(): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/auth/password-status`);
  }

  updatePassword(newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/update-password`, { newPassword });
  }
}