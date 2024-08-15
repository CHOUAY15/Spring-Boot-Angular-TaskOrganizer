import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Department } from 'src/app/shared/models/department';  // Assurez-vous que le modèle DTO existe et est bien importé

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  private apiUrl = `http://localhost:4000/api/departments`;  // Assurez-vous que l'URL de base de votre API est correcte

  constructor(private http: HttpClient) { }

  /**
   * Récupère la liste de tous les départements.
   *
   * @returns Observable contenant une liste de DepartmentDto
   */
  findAll(): Observable<Department[]> {
    return this.http.get<Department[]>(this.apiUrl);
  }

  /**
   * Crée un nouveau département.
   *
   * @param departmentDto DTO contenant les détails du département à créer.
   * @returns Observable contenant le DTO du département créé
   */
  saveDepartement(departmentDto: any): Observable<Department> {
    return this.http.post<Department>(this.apiUrl, departmentDto);
  }


  delete(dpartmntID: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/id/${dpartmntID}`);
  }
}
