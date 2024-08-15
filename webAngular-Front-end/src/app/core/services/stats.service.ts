// stats.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {
  private apiUrl = 'http://localhost:4000/api/stats'; 

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