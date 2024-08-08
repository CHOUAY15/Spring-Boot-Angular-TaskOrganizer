// employe-layout.component.ts
import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-employe-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './employe-layout.component.html',
  styleUrls: ['./employe-layout.component.scss']
})
export class EmployeLayoutComponent implements OnInit {
  @ViewChild('interBubble', { static: true }) interBubble!: ElementRef;

  private curX = 0;
  private curY = 0;
  private tgX = 0;
  private tgY = 0;

  ngOnInit() {
    this.move();
    window.addEventListener('mousemove', this.updateMousePosition.bind(this));
  }

  private updateMousePosition(event: MouseEvent) {
    this.tgX = event.clientX;
    this.tgY = event.clientY;
  }

  private move() {
    this.curX += (this.tgX - this.curX) / 20;
    this.curY += (this.tgY - this.curY) / 20;
    if (this.interBubble && this.interBubble.nativeElement) {
      this.interBubble.nativeElement.style.transform = `translate(${Math.round(this.curX)}px, ${Math.round(this.curY)}px)`;
    }
    requestAnimationFrame(this.move.bind(this));
  }
}