import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthenticationService } from './authentication.service';
import { Project } from 'src/app/shared/models/project';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private basePath = '/projects';
  private mgrId: number;
  apiUrl: string = `${environment.apiUrl}/projects`;

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
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
      map((uploadedFilePaths) => {
        project.deliverables = project.deliverables.map((deliverable, index) => ({
          name: deliverable.name,
          path: uploadedFilePaths[index] || ''
        }));
        return project;
      }),
      switchMap((updatedProject) => this.addProject(updatedProject))
    );
  }


  private uploadFile(file: File): Observable<string> {
    const filePath = `${this.basePath}/${new Date().getTime()}_${file.name}`;
    const uploadTask = this.storage.upload(filePath, file);

    return from(uploadTask).pipe(
      switchMap((snapshot) => snapshot.ref.getDownloadURL())
    );
  }

 
  addProject(project: any): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}`, project);
  }


 
  findByManager(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/mgrId/${this.mgrId}`);
  }

 
  getFileUrl(path: string): Observable<string> {
    return this.storage.ref(path).getDownloadURL();
  }

 
  updateProject(project: any, projectId: number): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/id/${projectId}`, project);
  }

 
  delete(projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/id/${projectId}`);
  }
}
