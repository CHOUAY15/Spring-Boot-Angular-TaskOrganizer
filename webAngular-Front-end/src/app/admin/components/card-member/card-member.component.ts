import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

import { Manager } from 'src/app/shared/models/manager';
import { Member } from 'src/app/shared/models/member';

@Component({
  selector: 'app-card-member',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-member.component.html',
  styleUrls: ['./card-member.component.scss']
})
export class CardMemberComponent  {
  @Input() employee: Member | Manager;



  
}
