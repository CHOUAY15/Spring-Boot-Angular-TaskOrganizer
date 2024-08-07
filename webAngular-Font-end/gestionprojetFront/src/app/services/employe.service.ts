import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../model/employe';
@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  constructor(
    private http: HttpClient,
  ) {}

  getEmployeesByTeamId(equipeId: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`http://localhost:4000/employes/eqpId/${equipeId}`);
  }
  getEmployeeByID(Id: string): Observable<Employee> {
    return this.http.get<Employee>(`http://localhost:4000/employes/id/${Id}`);
  }
}
