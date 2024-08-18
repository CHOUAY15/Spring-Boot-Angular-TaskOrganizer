import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Manager } from 'src/app/shared/models/manager';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private baseUrl = `${environment.apiUrl}/managers`;

  constructor(private http: HttpClient) { }

  getManagerById(id: number): Observable<Manager> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http.get<Manager>(url);
  }

  deleteManager(id: number): Observable<void> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http.delete<void>(url);
  }

  updateManager(manager: any): Observable<Manager> {
    return this.http.put<Manager>(this.baseUrl, manager);
  }

  getAllManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.baseUrl);
  }

  findBySectionId(secId:number): Observable<Manager[]> {
    const url = `${this.baseUrl}/secId/${secId}`;
    return this.http.get<Manager[]>(url);
  }
  addManagerToTeams(manager: any): Observable<string> {
    return this.http.post('http://localhost:4000/auth/register/manager', manager, { responseType: 'text' });
  }
  

  delete(mgrId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/id/${mgrId}`);
  }




}
