import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:4000/api/reports'; // URL de votre API Spring Boot

  constructor(private http: HttpClient) { }

  // Ajouter un rapport
  addReport(report: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, report).pipe(
      catchError(this.handleError)
    );
  }

  // Handle HTTP errors
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  // Supprimer un rapport
  deleteReport(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
  }

  uploadFileAndCreateReport(file: File, projectId: string,membreId:number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(`http://localhost:4000/api/upload`, formData).pipe(
      switchMap(response => {
        const filePath = response.filePath;
        const report = {
          name: file.name,
          path: filePath,
          projetId: projectId,
          membreId:membreId
        };
        return this.addReport(report);
      })
    );
  }



}
