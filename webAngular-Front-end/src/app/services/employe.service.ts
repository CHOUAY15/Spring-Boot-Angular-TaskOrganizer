import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employe';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  chefID:number;
  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
    private authService:AuthService
  ) {this.chefID=this.authService.getCurrentUser().person.id}

  getEmployeesByTeamId(equipeId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`http://localhost:4000/api/employes/eqpId/${equipeId}`);
  }
  getEmployeeByID(Id: string): Observable<Employee> {
    return this.http.get<Employee>(`http://localhost:4000/api/employes/id/${Id}`);
  }
  getEmployeesByChefId(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`http://localhost:4000/api/employes/chefId/${this.chefID}`);
  }

  getFileUrl(path: string): Observable<string> {
    return this.storage.ref(path).getDownloadURL();
  }
}
