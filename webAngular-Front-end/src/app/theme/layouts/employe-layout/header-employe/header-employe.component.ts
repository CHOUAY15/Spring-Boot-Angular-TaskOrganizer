import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header-employe',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './header-employe.component.html',
  styleUrl: './header-employe.component.scss'
})
export class HeaderEmployeComponent implements AfterViewInit {
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

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
    this.isMenuCollapsed = true; // Close the menu after clicking
  }
}