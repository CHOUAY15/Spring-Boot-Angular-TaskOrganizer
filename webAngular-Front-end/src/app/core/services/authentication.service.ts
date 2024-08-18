import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap, timer } from 'rxjs';
import { Person } from 'src/app/shared/models/person';
import { environment } from 'src/environments/environment';

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
  private apiUrl = "http://localhost:4000"
  private tokenExpirationTimer: any;
  private encryptionKey = 'AZERYh17'; // Replace with a secure key

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const userApp = localStorage.getItem('userApp');
    const decryptedUser = userApp ? this.decrypt(userApp) : null;
    this.currentUserSubject = new BehaviorSubject<LoginResponse | null>(JSON.parse(decryptedUser || 'null'));
    this.currentUser = this.currentUserSubject.asObservable();
    this.initTokenExpirationCheck();
  }

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, { email, password }).pipe(
      tap((response) => {
        const userApp = this.encrypt(JSON.stringify(response));
        localStorage.setItem('userApp', userApp);
        this.currentUserSubject.next(response);
        this.startTokenExpirationTimer(response.accessToken);
  
        if (response.role === 'CHEF' || response.role === 'USER') {
          this.checkPasswordStatus().subscribe(
            passwordUpdated => {
              if (!passwordUpdated) {
                this.router.navigate(['/update-password']);
              } else {
                this.redirectBasedOnRole(response.role);
              }
            }
          );
        } else {
          this.redirectBasedOnRole(response.role);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('userApp');
    this.currentUserSubject.next(null);
    this.stopTokenExpirationTimer();
    this.router.navigate(['/guest/login']);
  }

  getCurrentUser(): LoginResponse | null {
    const userApp = localStorage.getItem('userApp');
    if (userApp) {
      const decryptedUser = this.decrypt(userApp);
      return JSON.parse(decryptedUser);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
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
        const userApp = this.encrypt(JSON.stringify(response));
        localStorage.setItem('userApp', userApp);
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

  redirectBasedOnRole(role: string) {
    switch (role) {
      case 'CHEF':
        this.router.navigate(['/manager']);
        break;
      case 'USER':
        this.router.navigate(['/member']);
        break;
      case 'ADMIN':
        this.router.navigate(['/admin']);
        break;
      default:
        this.router.navigate(['/guest']);
    }
  }

  private encrypt(text: string): string {
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length));
    }
    return btoa(result); // Base64 encode the result
  }

  private decrypt(encryptedText: string): string {
    const text = atob(encryptedText); // Base64 decode
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length));
    }
    return result;
  }
}