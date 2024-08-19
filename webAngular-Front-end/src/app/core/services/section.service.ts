import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from 'src/app/shared/models/section';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SectionService {

  apiUrl: string = `${environment.apiUrl}/sections`; // URL de base de l'API

  constructor(private http: HttpClient) { }


  findAll(): Observable<Section[]> {
    return this.http.get<Section[]>(this.apiUrl);
  }


  save(section: Section): Observable<Section> {
    return this.http.post<Section>(this.apiUrl, section);
  }

  delete(sectionId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/id/${sectionId}`);
  }
  update(sectionDto: any): Observable<any> {
    return this.http.put<any>(this.apiUrl, sectionDto);
  }
}
