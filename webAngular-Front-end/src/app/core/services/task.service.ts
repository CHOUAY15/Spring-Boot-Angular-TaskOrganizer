import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskData } from 'src/app/shared/models/task';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private employeeId: number;

  constructor(
    private http: HttpClient,
    private authService: AuthenticationService
  ) {
    this.employeeId = authService.getCurrentUser().person.id;
  }

  /**
   * Retrieves all tasks associated with a specific project.
   * 
   * @param projectId ID of the project whose tasks are to be retrieved.
   * @returns Observable array of Task objects.
   */
  getTasksByProject(projectId: string): Observable<TaskData[]> {
    return this.http.get<TaskData[]>(`http://localhost:4000/api/tasks/prjtId/${projectId}`);
  }

  /**
   * Adds a new task to a project.
   * 
   * @param task TaskSubmitData containing the details of the task to be added.
   * @returns Observable of the saved Task object.
   */
  addTask(task: any): Observable<TaskData> {
    return this.http.post<TaskData>(`http://localhost:4000/api/tasks`, task);
  }

  /**
   * Retrieves tasks assigned to the current employee.
   * 
   * @returns Observable array of Task objects.
   */
  getTasksByEmployee(): Observable<TaskData[]> {
    return this.http.get<TaskData[]>(`http://localhost:4000/api/tasks/mbrId/${this.employeeId}`);
  }

  /**
   * Updates the status of an existing task.
   * 
   * @param taskId ID of the task to be updated.
   * @param newStatus New status of the task.
   * @returns Observable of the updated Task object.
   */
  updateTaskStatus(taskId: number, newStatus: string): Observable<TaskData> {
    return this.http.put<TaskData>(`http://localhost:4000/api/tasks/id/${taskId}`, { status: newStatus });
  }

  /**
   * Retrieves a task by its ID.
   * 
   * @param taskId ID of the task to be retrieved.
   * @returns Observable of the Task object.
   */
  getTaskById(taskId: string): Observable<TaskData> {
    return this.http.get<TaskData>(`http://localhost:4000/api/tasks/id/${taskId}`);
  }

  /**
   * Deletes a task by its ID.
   * 
   * @param taskId ID of the task to be deleted.
   * @returns Observable for the deletion request.
   */
  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:4000/api/tasks/id/${taskId}`);
  }
}
