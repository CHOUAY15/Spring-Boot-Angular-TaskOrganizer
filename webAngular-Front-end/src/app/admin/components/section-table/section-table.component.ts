import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { SectionService } from 'src/app/core/services/section.service';
import { Section } from 'src/app/shared/models/section';

@Component({
  selector: 'app-section-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,

  ],
  templateUrl: './section-table.component.html',
  styleUrl: './section-table.component.scss'
})
export class SectionTableComponent implements OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @Input() sections: Section[] = [];
  @Output() addSection = new EventEmitter<void>();
  @Output() sectionDeleted = new EventEmitter<void>();
  displayedColumns: string[] = ['name','actions'];
  dataSource: MatTableDataSource<Section>;
  showConfirmModal = false;
  sectionToDelete: number | null = null;

  constructor(
    private router: Router,
    private sectionService: SectionService
  ) {
    this.dataSource = new MatTableDataSource<Section>([]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sections']) {
      this.dataSource.data = this.sections;
      this.dataSource._updateChangeSubscription();
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }



  deleteSection(secId: number): void {
    this.sectionToDelete = secId;
    this.showConfirmModal = true;
  }

  cancelDelete(): void {
    this.showConfirmModal = false;
    this.sectionToDelete = null;
  }

  confirmDelete(): void {
    if (this.sectionToDelete !== null) {
      this.sectionService.delete(this.sectionToDelete).subscribe({
        next: (response) => {
          this.dataSource.data = this.dataSource.data.filter((section) => section.id !== this.sectionToDelete);
          this.dataSource._updateChangeSubscription();
          this.showConfirmModal = false;
          this.sectionToDelete = null;
          this.sectionDeleted.emit();
        },
        error: (error) => {
          this.showConfirmModal = false;
          this.sectionToDelete = null;
        }
      });
    }
  }
}