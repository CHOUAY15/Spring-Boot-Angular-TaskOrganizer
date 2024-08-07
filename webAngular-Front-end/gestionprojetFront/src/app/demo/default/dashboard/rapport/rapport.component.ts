import { Component } from '@angular/core';
import { RapportTableComponent } from '../rapport-table/rapport-table.component';

@Component({
  selector: 'app-rapport',
  standalone: true,
  imports: [RapportTableComponent],
  templateUrl: './rapport.component.html',
  styleUrl: './rapport.component.scss'
})
export class RapportComponent {

}
