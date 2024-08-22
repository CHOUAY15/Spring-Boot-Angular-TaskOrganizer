import { Injectable } from '@angular/core';
import { HttpClient, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError, filter, map, switchMap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  private apiUrl = 'http://localhost:4000/api/reports'; // URL de votre API Spring Boot
  private mbmR:number;

  constructor(private http: HttpClient,private authService:AuthenticationService) {

    this.mbmR=authService.getCurrentUser().person.id;
   }



 

  // Supprimer un rapport
  deleteReport(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
  }

  uploadFileAndCreateReport(file: File, projectId: string, membreId: number): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);
  
    return this.http.post(`http://localhost:4000/api/upload`, formData, {
      observe: 'response',
      responseType: 'text'
    }).pipe(
      switchMap(fileName => {
        if (fileName) {
          const report: any = {
            name: file.name,
            path: file.name,
            projetId: projectId,
            membreId: membreId
          };
          return this.addReport(report);
        }
        throw new Error('File name not received from server');
      }),
      catchError(error => {
        console.error('File upload or report creation failed:', error);
        return throwError(() => error);
      })
    );
  }
  
  private addReport(report: any): Observable<any> {
    return this.http.post<any>(`http://localhost:4000/api/reports`, report);
  }

  findReportsByMembre(): Observable<any[]> {
    const url = `${this.apiUrl}/mmbrId/${this.mbmR}`;
    return this.http.get<any[]>(url);
  }

  getFileUrl(filename: string): Observable<string> {
    return this.http.get(`http://localhost:4000/api/upload/file/${filename}`, { responseType: 'blob' })
      .pipe(
        map(response => {
          const blob = new Blob([response], { type: 'application/octet-stream' });
          return URL.createObjectURL(blob);
        })
      );
  }




}