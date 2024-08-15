import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthenticationService } from './authentication.service';
import { Member } from 'src/app/shared/models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private mgrId: number;

  constructor(
    private http: HttpClient,
    private storage: AngularFireStorage,
    private authService: AuthenticationService
  ) {
    this.mgrId = this.authService.getCurrentUser().person.id;
  }

  /**
   * Retrieves a list of members associated with a specific team.
   * 
   * @param teamId ID of the team whose members are to be retrieved.
   * @returns Observable array of Member objects.
   */
  findByTeam(teamId: string): Observable<Member[]> {
    return this.http.get<Member[]>(`http://localhost:4000/api/members/teamId/${teamId}`);
  }

  /**
   * Retrieves a list of members managed by the current manager.
   * 
   * @returns Observable array of Member objects.
   */
  findByManager(): Observable<Member[]> {
    return this.http.get<Member[]>(`http://localhost:4000/api/members/mgrId/${this.mgrId}`);
  }

  /**
   * Retrieves details of a specific member by ID.
   * 
   * @param id ID of the member to be retrieved.
   * @returns Observable of Member object.
   */
  getMemberById(id: string): Observable<Member> {
    return this.http.get<Member>(`http://localhost:4000/api/members/id/${id}`);
  }

  /**
   * Updates an existing member.
   * 
   * @param member Member object containing updated details.
   * @returns Observable of the updated Member object.
   */
  update(member: Member): Observable<Member> {
    return this.http.put<Member>(`http://localhost:4000/api/members`, member);
  }

  /**
   * Deletes a member by ID.
   * 
   * @param id ID of the member to be deleted.
   * @returns Observable for the deletion request.
   */
  delete(id: string): Observable<void> {
    return this.http.delete<void>(`http://localhost:4000/api/members/id/${id}`);
  }

  /**
   * Gets the URL of a file stored in Firebase.
   * 
   * @param path Path of the file in Firebase storage.
   * @returns Observable string of the file URL.
   */
  getFileUrl(path: string): Observable<string> {
    return this.storage.ref(path).getDownloadURL();
  }

  findAll(): Observable<Member[]> {
    return this.http.get<Member[]>(`http://localhost:4000/api/members`);
  }

}
