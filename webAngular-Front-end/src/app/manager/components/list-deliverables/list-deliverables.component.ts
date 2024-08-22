import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DeliverableService } from 'src/app/core/services/deliverable.service';
import { ProjectService } from 'src/app/core/services/project.service';
import { Deliverable } from 'src/app/shared/models/deliverable';
import { Project } from 'src/app/shared/models/project';
import { FeedBackComponent } from "../../../shared/components/feed-back/feed-back.component";

@Component({
  selector: 'app-list-deliverables',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, FeedBackComponent],
  templateUrl: './list-deliverables.component.html',
  styleUrls: ['./list-deliverables.component.scss']
})
export class ListDeliverablesComponent implements OnInit {
  @Input() projects: Project[] = [];
  showFeedback = false;
  feedbackMessage = '';
  
  filteredProjects: Project[] = []; // Array to hold filtered projects
  filterText: string = ''; // To hold the filter text

  constructor(private projectService: ProjectService,private deliverableService:DeliverableService) {}

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

  deleteDocument(doc: Deliverable): void {
    this.deliverableService.deleteDeliverable(doc.id).subscribe({
      next: () => {
        console.log(`Document with ID ${doc.id} deleted successfully.`);
        // Remove the deleted document from the list
        this.removeDocumentFromList(doc);
        // Show feedback
        this.showFeedbackMessage('Document supprimé avec succès');
      },
      error: (err) => {
        console.error('Error deleting document:', err);
        this.showFeedbackMessage('Erreur lors de la suppression du document');
      }
    });
  }
  removeDocumentFromList(doc: Deliverable): void {
    this.filteredProjects = this.filteredProjects.map(project => {
      if (project.deliverables) {
        project.deliverables = project.deliverables.filter(d => d.id !== doc.id);
      }
      return project;
    });
  }

  showFeedbackMessage(message: string): void {
    this.feedbackMessage = message;
    this.showFeedback = true;
  }

  closeFeedback(): void {
    this.showFeedback = false;
  }
  
}
