import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-feed-back',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feed-back.component.html',
  styleUrl: './feed-back.component.scss'
})
export class FeedBackComponent {
  @Input() message: string = '';
  @Input() isSuccess: boolean = true;
  @Output() closed = new EventEmitter<void>();

  close() {
    this.closed.emit();
  }

}
