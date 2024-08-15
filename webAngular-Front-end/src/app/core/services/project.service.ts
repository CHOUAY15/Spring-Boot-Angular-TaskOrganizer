import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthenticationService } from './authentication.service';
import { Project } from 'src/app/shared/models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private basePath = '/projects';
  private mgrId: number;

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
    private authService: AuthenticationService
  ) {
    this.mgrId = authService.getCurrentUser().person.id;
  }

  /**
   * Retrieves a list of projects associated with a specific team.
   * 
   * @param teamId ID of the team whose projects are to be retrieved.
   * @returns Observable array of Project objects.
   */
  findByTeam(teamId: string): Observable<Project[]> {
    return this.http.get<Project[]>(`http://localhost:4000/api/projects/teamId/${teamId}`);
  }

  /**
   * Adds a new project with associated files to a team.
   * 
   * @param project Project object containing project details.
   * @param files Array of files associated with the project.
   * @returns Observable of the saved Project object.
   */
  
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


  /**
   * Uploads a file to Firebase storage.
   * 
   * @param file File to be uploaded.
   * @returns Observable string of the file's storage path.
   */
  private uploadFile(file: File): Observable<string> {
    const filePath = `${this.basePath}/${new Date().getTime()}_${file.name}`;
    const uploadTask = this.storage.upload(filePath, file);

    return from(uploadTask).pipe(
      switchMap((snapshot) => snapshot.ref.getDownloadURL())
    );
  }

  /**
   * Adds a new project to the backend.
   * 
   * @param project Project object containing the project details.
   * @returns Observable of the saved Project object.
   */
  addProject(project: any): Observable<Project> {
    return this.http.post<Project>(`http://localhost:4000/api/projects`, project);
  }


  /**
   * Retrieves a list of projects managed by the current manager.
   * 
   * @returns Observable array of Project objects.
   */
  findByManager(): Observable<Project[]> {
    return this.http.get<Project[]>(`http://localhost:4000/api/projects/mgrId/${this.mgrId}`);
  }

  /**
   * Retrieves the download URL for a file from Firebase storage.
   * 
   * @param path Path of the file in storage.
   * @returns Observable string of the download URL.
   */
  getFileUrl(path: string): Observable<string> {
    return this.storage.ref(path).getDownloadURL();
  }

  /**
   * Updates an existing project.
   * 
   * @param project Project object containing updated details.
   * @param projectId ID of the project to be updated.
   * @returns Observable of the updated Project object.
   */
  updateProject(project: any, projectId: number): Observable<Project> {
    return this.http.put<Project>(`http://localhost:4000/api/projects/id/${projectId}`, project);
  }

  /**
   * Deletes a project by its ID.
   * 
   * @param projectId ID of the project to be deleted.
   * @returns Observable for the deletion request.
   */
  delete(projectId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:4000/api/projects/id/${projectId}`);
  }
}
