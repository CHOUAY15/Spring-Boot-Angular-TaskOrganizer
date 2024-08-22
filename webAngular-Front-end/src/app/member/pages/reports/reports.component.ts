import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { ReportService } from 'src/app/core/services/report.service';
import { Report } from 'src/app/shared/models/report';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent  implements OnInit{

  reports$: Observable<any[]>;
  filteredReports$: Observable<any[]>;
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  constructor(private reportService: ReportService) {}

  ngOnInit() {
    this.reports$ = this.reportService.findReportsByMembre();
    this.filteredReports$ = this.reports$;
    this.reports$.subscribe(reports => {
      this.totalPages = Math.ceil(reports.length / this.pageSize);
    });
  }
  filterReports() {
    this.filteredReports$ = this.reports$.pipe(
      map(reports => reports.filter(report =>
        report.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        report.path.toLowerCase().includes(this.searchTerm.toLowerCase())
      ))
    );
    this.currentPage = 1;
  }

  changePage(direction: number) {
    this.currentPage += direction;
    if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
  }
  getFile(report:Report) {
    this.reportService.getFileUrl(report.path).subscribe(
      (url: string) => {
        window.open(url, '_blank');
      },
      (error) => {
        console.error('Error getting file URL:', error);
        // Handle error (e.g., show an error message to the user)
      }
    );
    }

    deleteReport(report:Report):void{

      this.reportService.deleteReport(report.id).subscribe({
        next: () => {
          console.log(`Document with ID ${report.id} deleted successfully.`);
          // Remove the deleted document from the list
         
        },
        error: (err) => {
          console.error('Error deleting document:', err);
        
        }
      });
    }

}
