import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthenticationService, LoginResponse } from './authentication.service';
import { Team } from 'src/app/shared/models/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  apiUrl: string = "http://localhost:4000/api/teams";
  user: LoginResponse;

  constructor(
    private http: HttpClient,
    authService: AuthenticationService
  ) {
    this.user = authService.getCurrentUser();
  }

  /**
   * Retrieves teams managed by the current manager (user).
   * 
   * @returns Observable array of Team objects.
   */
  findTeamsByManager(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/mgrId/${this.user.person.id}`);
  }

  findAll(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}`);
  }
  delete(teamId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:4000/api/teams/id/${teamId}`);
  }
  
  addTeamToDepartment(team: any): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
