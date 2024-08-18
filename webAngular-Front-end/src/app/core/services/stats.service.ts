// stats.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  apiUrl: string = `${environment.apiUrl}/stats`;
  constructor(private http: HttpClient) { }

  getTotalProjects(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/projects/count`);
  }

  getTotalTeams(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/teams/count`);
  }

  getTotalMembers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/members/count`);
  }

  getTotalManagers(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/managers/count`);
  }
  getProjectProgressRatio(): Observable<{ratio: number, percentage: number}> {
    return this.http.get<{ratio: number, percentage: number}>(`${this.apiUrl}/projects/progress-ratio`);
  }
}