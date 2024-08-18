import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthenticationService } from './authentication.service';
import { Member } from 'src/app/shared/models/member';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private mgrId: number;
  apiUrl: string = `${environment.apiUrl}/members`;

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
    private authService: AuthenticationService
  ) {
    this.mgrId = this.authService.getCurrentUser().person.id;
  }


  findByTeam(teamId: string): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}/teamId/${teamId}`);
  }


  findByManager(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}/mgrId/${this.mgrId}`);
  }

 
  getMemberById(id: string): Observable<Member> {
    return this.http.get<Member>(`${this.apiUrl}/id/${id}`);
  }

 
  update(member: Member): Observable<Member> {
    return this.http.put<Member>(`${this.apiUrl}`, member);
  }

 
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/id/${id}`);
  }

 
  getFileUrl(path: string): Observable<string> {
    return this.storage.ref(path).getDownloadURL();
  }

  findAll(): Observable<Member[]> {
    return this.http.get<Member[]>(`${this.apiUrl}`);
  }

  addToTeam(member: any): Observable<string> {
    return this.http.post('http://localhost:4000/auth/register/member', member, { responseType: 'text' });
  }
  uploadCSV(formData: FormData): Observable<any> {
    return this.http.post(`http://localhost:4000/auth/register/csv`, formData);
  }

}
