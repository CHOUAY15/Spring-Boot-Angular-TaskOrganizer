import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent implements OnInit, OnDestroy{
  
  private intervalId: any;

  ngOnInit() {
    this.randomPosition();
    this.intervalId = setInterval(() => this.randomPosition(), 5000);
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private randomPosition() {
    const container = document.querySelector('.image-container') as HTMLElement;
    const images = container.querySelectorAll('.floating-image');
    
    images.forEach((img: HTMLImageElement) => {
      const maxX = container.offsetWidth - img.width;
      const maxY = container.offsetHeight - img.height;
      
      const randomX = Math.floor(Math.random() * maxX);
      const randomY = Math.floor(Math.random() * maxY);
      
      img.style.left = `${randomX}px`;
      img.style.top = `${randomY}px`;
    });
  }

}
