// employe-layout.component.ts
import { Component} from '@angular/core';
import { HeaderEmployeComponent } from "./header-employe/header-employe.component";
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-employe-layout',
  standalone: true,
  imports: [HeaderEmployeComponent,RouterModule],
  templateUrl: './employe-layout.component.html',
  styleUrls: ['./employe-layout.component.scss']
})
export class EmployeLayoutComponent {}
