import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentTableComponent } from '../../components/department-table/department-table.component';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FeedBackComponent } from 'src/app/shared/components/feed-back/feed-back.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { Department } from 'src/app/shared/models/department';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
import { LoadingService } from 'src/app/core/services/loading.service';
import { DepartmentService } from 'src/app/core/services/department.service';
import { DialogAddDepartmentComponent } from "../../components/department-table/dialog-add-department/dialog-add-department.component";

@Component({
  selector: 'app-departments',
  standalone: true,
  imports: [DepartmentTableComponent, CommonModule, SharedModule, RouterLink, SharedModule, FeedBackComponent, DialogAddDepartmentComponent],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.scss'
})
export class DepartmentsComponent implements OnInit, OnDestroy {

  private departementSubject = new BehaviorSubject<Department[]>([]);
  private subscription: Subscription = new Subscription();

  departments: Department[] = [];

  departments$ = this.departementSubject.asObservable();
  loading$: Observable<boolean>;
  error$: Observable<boolean>;
  showDialog = false;
  showFeedback = false;
  feedbackMessage = '';
  isInitialLoad = true;

  constructor(
    private loadingService: LoadingService,
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
  ) {
    this.loading$ = this.loadingService.loading$;
    this.error$ = this.loadingService.error$;
  }

  ngOnInit(): void {
  
      this.loadDepartments();

  }

  loadDepartments(): void {
    const departmentObservable = this.departmentService.findAll().pipe(
      tap((departments) => console.log('deptt', departments))
    );

    if (this.isInitialLoad) {
      const loadedData$ = this.loadingService.loadData(departmentObservable, 400);
      this.subscription.add(
        loadedData$.subscribe(
          (departments) => {
            console.log('departmentComponent: Updating departments', departments);
            this.departementSubject.next(departments || []);
            this.isInitialLoad = false;
          },
          (error) => console.error('deppptt', error)
        )
      );
    } else {
      this.subscription.add(
        departmentObservable.subscribe(
          (projects) => {
            console.log('deppt', projects);
            this.departementSubject.next(projects || []);
          },
          (error) => console.error('deppptt', error)
        )
      );
    }
  }

  addProject(): void { // Added void return type for clarity
    this.showDialog = true;
  }

  handleClose(): void { // Added void return type for clarity
    this.showDialog = false;
  }

  onDepartementAdd(newDepartment: Department): void {
    this.loadDepartments();
    this.showDialog = false;
    this.showFeedback = true;
    this.feedbackMessage = 'Département ajouté avec succès !';

  }
  
  onDepartmentDeleted(): void {
    this.loadDepartments();
    this.showFeedback = true;
    this.feedbackMessage = 'Département supprimé avec succès !';

  }

  ngOnDestroy(): void { // Added void return type for clarity
    this.subscription.unsubscribe();
  }
  closeFeedback() {
    this.feedbackMessage = '';
  }
}
