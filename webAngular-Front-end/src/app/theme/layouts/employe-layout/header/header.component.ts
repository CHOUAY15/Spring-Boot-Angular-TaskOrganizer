// header.component.ts
import { CommonModule } from '@angular/common';
import { Component, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements AfterViewInit {
  @ViewChild('header') headerElement!: ElementRef;

  isMenuCollapsed = true;
  isScrolledToBottom = false;
  isHeaderScrolled = false;

  ngAfterViewInit() {
    this.checkScroll();
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    this.checkScroll();
  }

  private checkScroll(): void {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = this.headerElement.nativeElement.offsetHeight;

    // Check if scrolled past header height
    this.isHeaderScrolled = scrollPosition > headerHeight;

    // Check if scrolled to bottom
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    this.isScrolledToBottom = (windowHeight + scrollPosition) >= (documentHeight - 10); // 10px threshold
  }
}