import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliverableService {
    private apiUrl = 'http://localhost:4000/api/deliverables';  // URL de votre API Spring Boot

  constructor(private http: HttpClient) { }




  // Supprimer un rapport
  deleteDeliverable(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log("Delete URL:", url);
    return this.http.delete<void>(url).pipe(
      tap(() => console.log(`Deleted deliverable with id=${id}`)),
      catchError((error) => {
        console.error('Delete failed', error);
        return throwError(error);
      })
    );
  }


 

}
