import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, from, map, Observable, switchMap } from 'rxjs';
import { Projet } from '../model/projet';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ProjectSubmited, ProjectWithOpenState } from '../model/projetSubmitData';
@Injectable({
  providedIn: 'root'
})
export class ProjetService {
  private basePath = '/projets';

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage
  ) {}

  getProjetsByTeamId(equipeId: string): Observable<Projet[]> {
    return this.http.get<Projet[]>(`http://localhost:4000/projets/eqpId/${equipeId}`);
  }

  addProjectWithFiles(project: ProjectSubmited, files: File[], eqpId: string): Observable<Projet> {
    const uploadTasks = files.map((file) => this.uploadFile(file));

    return forkJoin(uploadTasks).pipe(
      map((uploadedFilePaths) => {
        project.livrables = project.livrables.map((livrable, index) => ({
          nom: livrable.nom,
          path: uploadedFilePaths[index] || ''
        }));
        return project;
      }),
      switchMap((updatedProject) => this.addProject(updatedProject, eqpId))
    );
  }
  private uploadFile(file: File): Observable<string> {
    const filePath = `${this.basePath}/${new Date().getTime()}_${file.name}`;
    const uploadTask = this.storage.upload(filePath, file);

    return from(uploadTask).pipe(map((snapshot) => snapshot.ref.fullPath));
  }

  addProject(project: ProjectSubmited, eqpId: string): Observable<any> {
    return this.http.post(`http://localhost:4000/projets/eqpId/${eqpId}`, project);
  }


  getProjetsByChef(): Observable<ProjectWithOpenState[]> {
    return this.http.get<ProjectWithOpenState[]>(`http://localhost:4000/projets/chefId/12`);
  }

  getFileUrl(path: string): Observable<string> {
    return this.storage.ref(path).getDownloadURL();
  }
  deleteProjet(prjtId:number):Observable<any>{
    return this.http.delete(`http://localhost:4000/projets/id/${prjtId}`);


  }
  getProjetByTeam(equipeId: string): Observable<ProjectWithOpenState[]> {
    return this.http.get<ProjectWithOpenState[]>(`http://localhost:4000/projets/eqpId/10`);
  }

}
