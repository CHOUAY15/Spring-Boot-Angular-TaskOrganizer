import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employe';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage
  ) {}

  getEmployeesByTeamId(equipeId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`http://localhost:4000/employes/eqpId/${equipeId}`);
  }
  getEmployeeByID(Id: string): Observable<Employee> {
    return this.http.get<Employee>(`http://localhost:4000/employes/id/${Id}`);
  }
  getEmployeesByChefId(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`http://localhost:4000/employes/chefId/12`);
  }

  getFileUrl(path: string): Observable<string> {
    return this.storage.ref(path).getDownloadURL();
  }
}
