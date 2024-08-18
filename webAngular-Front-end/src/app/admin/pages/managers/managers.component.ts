import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ManagerService } from 'src/app/core/services/manager.service';
import { Manager } from 'src/app/shared/models/manager';
import { DialogAddManagerComponent } from '../../components/manager-table/dialog-add-manager/dialog-add-manager.component';
import { ManagerTableComponent } from '../../components/manager-table/manager-table.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FeedBackComponent } from "../../../shared/components/feed-back/feed-back.component";
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SharedModule } from "../../../theme/shared/shared.module";

@Component({
  selector: 'app-managers',
  standalone: true,
  imports: [ManagerTableComponent, DialogAddManagerComponent, MatButtonModule, CommonModule, FeedBackComponent, SharedModule],
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.scss']
})
export class ManagersComponent implements OnInit {
  private managerSubject = new BehaviorSubject<Manager[]>([]);
  private subscription: Subscription = new Subscription();
  
  managers: Manager[] = [];
  showDialog = false;
  showFeedback = false;
  feedbackMessage = '';

  managers$ = this.managerSubject.asObservable();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  isInitialLoad = true;

  constructor(private managerService: ManagerService, private loadingService: LoadingService,) {

    this.loading$ = this.loadingService.loading$;
    this.error$ = this.loadingService.error$;
  }

  ngOnInit() {
    this.loadManagers();
  }

  loadManagers() {
    const sectionObservable = this.managerService.getAllManagers().pipe(
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
}