import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-employe-layout',
  standalone: true,
  imports: [RouterModule,HeaderComponent],
  templateUrl: './employe-layout.component.html',
  styleUrl: './employe-layout.component.scss'
})
export class EmployeLayoutComponent {

}
