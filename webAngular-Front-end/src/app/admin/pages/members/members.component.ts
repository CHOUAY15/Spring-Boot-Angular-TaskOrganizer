import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MemberTableComponent } from '../../components/member-table/member-table.component';
import { SharedModule } from '../../../theme/shared/shared.module';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BehaviorSubject, Subscription, Observable, tap } from 'rxjs';
import { Member } from 'src/app/shared/models/member';
import { LoadingService } from 'src/app/core/services/loading.service';
import { MemberService } from 'src/app/core/services/member.service';
import { DialogAddMemberComponent } from "../../components/member-table/dialog-add-member/dialog-add-member.component";
import { FeedBackComponent } from "../../../shared/components/feed-back/feed-back.component";

@Component({
  selector: 'app-members',
  standalone: true,
  imports: [MemberTableComponent, SharedModule, CommonModule, RouterLink, DialogAddMemberComponent, FeedBackComponent],
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit, OnDestroy {
  @ViewChild('fileInput') fileInput!: ElementRef;

  private managerSubject = new BehaviorSubject<Member[]>([]);
  private subscription: Subscription = new Subscription();
 
  managers: Member[] = [];
  showDialog = false;
  showFeedback = false;
  feedbackMessage = '';
  managers$ = this.managerSubject.asObservable();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  isInitialLoad = true;

  constructor(
    private managerService: MemberService,
    private loadingService: LoadingService,
  ) {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.loadingService.error$;
  }

  ngOnInit() {
    this.loadManagers();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadManagers() {
    const sectionObservable = this.managerService.findAll().pipe(
      tap((mgrs) => console.log('deptt', mgrs))
    );

    if (this.isInitialLoad) {
      const loadedData$ = this.loadingService.loadData(sectionObservable, 400);
      this.subscription.add(
        loadedData$.subscribe(
          (managers) => {
            console.log('mgrs: Updating sections', managers);
            this.managerSubject.next(managers || []);
            this.isInitialLoad = false;
          },
          (error) => console.error('deppptt', error)
        )
      );
    } else {
      this.subscription.add(
        sectionObservable.subscribe(
          (managers) => {
            console.log('deppt', managers);
            this.managerSubject.next(managers || []);
          },
          (error) => console.error('deppptt', error)
        )
      );
    }
  }

  openAddManagerDialog() {
    this.showDialog = true;
  }

  closeDialog() {
    this.showDialog = false;
    this.loadManagers();
  }

  onManagerAdded(event: { success: boolean, message: string }) {
    this.showFeedbackMessage(event.message);
    if (event.success) {
      setTimeout(() => {
        this.closeDialog();
      }, 1000);
    }
  }

  showFeedbackMessage(message: string) {
    this.feedbackMessage = message;
    this.showFeedback = true;
    setTimeout(() => {
      this.showFeedback = false;
    }, 3000);
  }

  closeFeedback() {
    this.showFeedback = false;
  }

  openFileInput() {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      // Here you would handle the CSV file
      // For example, you could call a service method to parse and upload the CSV
      this.uploadCSV(file);
    }
  }

  uploadCSV(file: File) {
    const formData = new FormData();
    formData.append('file', file);
  
    this.managerService.uploadCSV(formData).subscribe(
      (response) => {
        console.log('CSV upload response:', response);
        this.showFeedbackMessage('Fichier CSV téléchargé et traité avec succès.');
        this.loadManagers(); // Refresh the member list
      },
      (error) => {
        console.error('Error uploading CSV:', error);
        this.showFeedbackMessage('Fichier CSV téléchargé et traité avec succès.');
        this.loadManagers(); // Refresh the member list
      }
    );
  }
}