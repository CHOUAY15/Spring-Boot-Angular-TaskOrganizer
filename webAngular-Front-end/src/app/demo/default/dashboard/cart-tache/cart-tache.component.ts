import { CommonModule } from '@angular/common';
import { Component, Input, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { Tache } from 'src/app/model/tache';






@Component({
  selector: 'app-cart-tache',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  templateUrl: './cart-tache.component.html',
  styleUrls: ['./cart-tache.component.scss']
})
export class CartTacheComponent implements OnInit, OnDestroy {
  @Input() tache: Tache;
  @ViewChild('menu', { static: false }) menu: ElementRef;
  constructor(private route:Router){

  }


  isMenuOpen = false;
  documentClickListener: any;



  toggleAdditionalInfo() {
    this.route.navigateByUrl(`chef/taches/${this.tache.id}/commentaires`)


  }

  




  ngOnInit() {
    this.documentClickListener = this.onDocumentClick.bind(this);
    document.addEventListener('click', this.documentClickListener);
  }

  ngOnDestroy() {
    document.removeEventListener('click', this.documentClickListener);
  }

  toggleMenu(event: MouseEvent) {
    this.isMenuOpen = !this.isMenuOpen;
    event.stopPropagation(); // Prevent the event from bubbling up to the document
  }

  editTask() {
    // Implement edit logic
    this.isMenuOpen = false;
  }

  deleteTask() {
    // Implement delete logic
    this.isMenuOpen = false;
  }

  onDocumentClick(event: MouseEvent) {
    if (this.isMenuOpen && this.menu && !this.menu.nativeElement.contains(event.target)) {
      this.isMenuOpen = false;
    }
  }
}
