import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Manager } from 'src/app/shared/models/manager';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

  private baseUrl = 'http://localhost:4000/api/managers'; // Adjust this URL if needed

  constructor(private http: HttpClient) { }

  getManagerById(id: number): Observable<Manager> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http.get<Manager>(url).pipe(
      catchError(this.handleError)
    );
  }

  deleteManager(id: number): Observable<void> {
    const url = `${this.baseUrl}/id/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError(this.handleError)
    );
  }

  updateManager(manager: any): Observable<Manager> {
    return this.http.put<Manager>(this.baseUrl, manager).pipe(
      catchError(this.handleError)
    );
  }

  getAllManagers(): Observable<Manager[]> {
    return this.http.get<Manager[]>(this.baseUrl).pipe(
      catchError(this.handleError)
    );
  }

  findByDepartmntId(deptId:number): Observable<Manager[]> {
    const url = `${this.baseUrl}/deptId/${deptId}`;
    return this.http.get<Manager[]>(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
