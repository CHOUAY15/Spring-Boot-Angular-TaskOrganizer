import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService, LoginResponse } from './authentication.service';
import { Team } from 'src/app/shared/models/team';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  apiUrl: string = `${environment.apiUrl}/teams`;


  user: LoginResponse;

  constructor(
    private http: HttpClient,
    authService: AuthenticationService
  ) {
    this.user = authService.getCurrentUser();
  }


  findByManager(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/mgrId/${this.user.person.id}`);
  }


  findTeamsBySectId(secId: number): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/secId/${secId}`);
  }


  findAll(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}`);
  }


  delete(teamId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/id/${teamId}`);
  }

  addTeamToSection(team: Team): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, team);
  }
}
