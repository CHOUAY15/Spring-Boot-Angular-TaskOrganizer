import { Component } from '@angular/core';
import { ListProjetsComponent } from "../../components/list-projets/list-projets.component";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ListProjetsComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

}
