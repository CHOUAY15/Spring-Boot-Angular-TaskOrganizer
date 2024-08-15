import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from 'src/app/core/services/project.service';
import { Deliverable } from 'src/app/shared/models/deliverable';
import { Project } from 'src/app/shared/models/project';

@Component({
  selector: 'app-list-deliverables',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './list-deliverables.component.html',
  styleUrls: ['./list-deliverables.component.scss']
})
export class ListDeliverablesComponent implements OnInit {
  @Input() projects: Project[] = [];
  
  filteredProjects: Project[] = []; // Array to hold filtered projects
  filterText: string = ''; // To hold the filter text

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.filteredProjects = [...this.projects];
  }

  filterProjects() {
    if (!this.filterText) {
      this.filteredProjects = [...this.projects];
    } else {
      this.filteredProjects = this.projects.filter(project =>
        project.name.toLowerCase().includes(this.filterText.toLowerCase())
        // Uncomment and adjust the following line if filtering by date is needed
        // project.startDate?.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
  }

  viewFile(deliverable: Deliverable) {
    this.projectService.getFileUrl(deliverable.path).subscribe(
      (url: string) => {
        window.open(url, '_blank');
      },
      (error) => {
        console.error('Error getting file URL:', error);
        // Handle error (e.g., show an error message to the user)
      }
    );
  }

  toggleProject(project: Project): void {
    (project as any).isOpen = !(project as any).isOpen;
  }

  addPDF(project: Project, event: Event): void {
    event.stopPropagation(); // Prevents toggling the project
    // Logic to add a new PDF to the project
    console.log('Add a PDF to the project:', project.name);
  }

  deleteDocument(project: Project, doc: Deliverable): void {
    // Logic to delete the document from the project
    console.log('Delete document:', doc.name, 'from project:', project.name);
  }
}
