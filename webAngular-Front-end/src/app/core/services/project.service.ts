import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { catchError, forkJoin, from, map, Observable, of, switchMap } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Project } from 'src/app/shared/models/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  private mgrId: number;
  private baseUrl = 'http://localhost:4000/api/upload';

  apiUrl: string = `${environment.apiUrl}/projects`;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.mgrId = authService.getCurrentUser().person.id;
  }


  findByTeam(teamId: string): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/teamId/${teamId}`);
  }


  
  addProjectWithFiles(project: any, files: File[]): Observable<Project> {
    const uploadTasks = files.map((file) => this.uploadFile(file));

    return forkJoin(uploadTasks).pipe(
      map((uploadedFileNames) => {
        project.deliverables = project.deliverables.map((deliverable, index) => ({
          name: deliverable.name,
          path: uploadedFileNames[index] || ''
        }));
        return project;
      }),
      switchMap((updatedProject) => this.addProject(updatedProject))
    );
  }

  private uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.baseUrl}`, formData, {
      reportProgress: true,
      observe: 'events',
      responseType: 'text'
    }).pipe(
      map(event => {
        if (event.type === HttpEventType.Response) {
          return event.body;
        }
        return '';
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<string> {
    console.error('An error occurred:', error);
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return of('');
  }

  addProject(project: any): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}`, project);
  }


 
  findByManager(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/mgrId/${this.mgrId}`);
  }

 
  getFileUrl(filename: string): Observable<string> {
    return this.http.get(`${this.baseUrl}/file/${filename}`, { responseType: 'blob' })
      .pipe(
        map(response => {
          const blob = new Blob([response], { type: 'application/octet-stream' });
          return URL.createObjectURL(blob);
        })
      );
  }

 
  updateProject(project: any, projectId: number): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/id/${projectId}`, project);
  }

 
  delete(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/id/${projectId}`);
  }
  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
