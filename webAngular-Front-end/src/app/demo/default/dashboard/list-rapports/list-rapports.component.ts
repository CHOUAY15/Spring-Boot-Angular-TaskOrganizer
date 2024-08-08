import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EmployeWithOpen, Rapport } from 'src/app/model/employe';
import { EmployeService } from 'src/app/services/employe.service';

@Component({
  selector: 'app-list-rapports',
  standalone: true,
  imports: [CommonModule, DatePipe,FormsModule],
  templateUrl: './list-rapports.component.html',
  styleUrl: './list-rapports.component.scss'
})
export class ListRapportsComponent implements OnInit  {
  filteredEmployes: any[] = []; // Array to hold filtered employees
  filterText: string = ''; // To hold the filter text
  
  @Input() employes:EmployeWithOpen[];


  constructor(private employeService: EmployeService) {}
  ngOnInit(): void {
    this.filteredEmployes = [...this.employes];
  }
  filterEmployes() {
    if (!this.filterText) {
      this.filteredEmployes = [...this.employes];
    } else {
      this.filteredEmployes = this.employes.filter(employe => 
        employe.nom.toLowerCase().includes(this.filterText.toLowerCase()) ||
        employe.prenom.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
  }






  viewFile(livrable: Rapport) {
    this.employeService.getFileUrl(livrable.path).subscribe(
      (url: string) => {
        window.open(url, '_blank');
      },
      (error) => {
        console.error('Error getting file URL:', error);
        // Handle error (e.g., show an error message to the user)
      }
    );
  }
  toggleEmploye(employe: EmployeWithOpen): void {
    (employe as any).isOpen = !(employe as any).isOpen;
  }

  

  


}
