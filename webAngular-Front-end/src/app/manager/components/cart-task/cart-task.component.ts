import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/core/services/task.service';
import { TaskData } from 'src/app/shared/models/task';

@Component({
  selector: 'app-cart-task',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './cart-task.component.html',
  styleUrls: ['./cart-task.component.scss']
})
export class CartTaskComponent implements OnInit, OnDestroy {
  @Input() task: TaskData;
  @ViewChild('menu', { static: false }) menu: ElementRef;
  @Output() taskDeleted = new EventEmitter<number>();

  isMenuOpen = false;
  private documentClickListener: () => void;

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.documentClickListener = this.onDocumentClick.bind(this);
    document.addEventListener('click', this.documentClickListener);
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.documentClickListener);
  }

  toggleMenu(event: MouseEvent): void {
    this.isMenuOpen = !this.isMenuOpen;
    event.stopPropagation();
  }

  editTask(): void {
    // Implement edit logic here
    this.isMenuOpen = false;
  }

  deleteTask(): void {
    if (this.task && this.task.id) {
      this.taskService.deleteTask(this.task.id).subscribe(
        () => {
          console.log('Task deleted successfully');
          this.taskDeleted.emit(this.task.id);
          this.isMenuOpen = false;
        },
        error => {
          console.error('Error deleting task:', error);
          // You could also show an error feedback here
          // this.showFeedback('Error deleting task', false);
        }
      );
    } else {
      console.error('Cannot delete task: Invalid task ID');
    }
  }
  toggleAdditionalInfo(): void {
    this.router.navigateByUrl(`chef/taches/${this.task.id}/commentaires`);
  }

  private onDocumentClick(event: MouseEvent): void {
    if (this.isMenuOpen && this.menu && !this.menu.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }
}