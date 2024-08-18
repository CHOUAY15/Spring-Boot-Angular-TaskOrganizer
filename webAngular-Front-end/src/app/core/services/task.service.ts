import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskData } from 'src/app/shared/models/task';
import { AuthenticationService } from './authentication.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  apiUrl: string = `${environment.apiUrl}/tasks`;
  private employeeId: number;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.employeeId = authService.getCurrentUser().person.id;
  }

  getTasksByProject(projectId: string): Observable<TaskData[]> {
    return this.http.get<TaskData[]>(`${this.apiUrl}/prjtId/${projectId}`);
  }

  addTask(task: any): Observable<TaskData> {
    return this.http.post<TaskData>(`${this.apiUrl}`, task);
  }

  getTasksByEmployee(): Observable<TaskData[]> {
    return this.http.get<TaskData[]>(`${this.apiUrl}/mbrId/${this.employeeId}`);
  }

  updateTaskStatus(taskId: number, newStatus: string): Observable<TaskData> {
    return this.http.put<TaskData>(`${this.apiUrl}/id/${taskId}`, { status: newStatus });
  }

  getTaskById(taskId: string): Observable<TaskData> {
    return this.http.get<TaskData>(`${this.apiUrl}/id/${taskId}`);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/id/${taskId}`);
  }
}
