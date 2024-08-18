import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FeedBackComponent } from 'src/app/shared/components/feed-back/feed-back.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { SectionTableComponent } from '../../components/section-table/section-table.component';
import { DialogAddSectionComponent } from '../../components/section-table/dialog-add-section/dialog-add-section.component';
import { Section } from 'src/app/shared/models/section';
import { SectionService } from 'src/app/core/services/section.service';

@Component({
  selector: 'app-sections',
  standalone: true,
  imports: [
    SectionTableComponent,
    CommonModule,
    SharedModule,
    RouterLink,
    FeedBackComponent,
    DialogAddSectionComponent
  ],
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss']
})
export class SectionsComponent implements OnInit, OnDestroy {

  private sectionSubject = new BehaviorSubject<Section[]>([]);
  private subscription: Subscription = new Subscription();

  sections: Section[] = [];
  sections$ = this.sectionSubject.asObservable();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  showDialog = false;
  showFeedback = false;
  feedbackMessage = '';
  isInitialLoad = true;

  constructor(
    private loadingService: LoadingService,
    private sectionService: SectionService,
  ) {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.loadingService.error$;
  }

  ngOnInit(): void {
    this.loadSections();
  }

  loadSections(): void {
    const sectionObservable = this.sectionService.findAll().pipe(
      tap((sections) => console.log('deptt', sections))
    );

    if (this.isInitialLoad) {
      const loadedData$ = this.loadingService.loadData(sectionObservable, 400);
      this.subscription.add(
        loadedData$.subscribe(
          (sections) => {
            console.log('departmentComponent: Updating sections', sections);
            this.sectionSubject.next(sections || []);
            this.isInitialLoad = false;
          },
          (error) => console.error('deppptt', error)
        )
      );
    } else {
      this.subscription.add(
        sectionObservable.subscribe(
          (sections) => {
            console.log('deppt', sections);
            this.sectionSubject.next(sections || []);
          },
          (error) => console.error('deppptt', error)
        )
      );
    }
  }

  addSection(): void {
    this.showDialog = true;
  }

  handleClose(): void {
    this.showDialog = false;
  }

  onSectionAdd(newSection: Section): void {
    this.loadSections();
    this.showDialog = false;
    this.showFeedback = true;
    this.feedbackMessage = 'Section ajouté avec succès !';
  }

  onSectionDeleted(): void {
    this.loadSections();
    this.showFeedback = true;
    this.feedbackMessage = 'Section supprimé avec succès !';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  closeFeedback(): void {
    this.feedbackMessage = '';
  }
}
