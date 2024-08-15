import { Component } from '@angular/core';
import { CardMemberComponent } from "../../components/card-member/card-member.component";

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [CardMemberComponent],
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent {

}
