import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MemberService } from 'src/app/core/services/member.service';
import { Member } from 'src/app/shared/models/member';
import { Report } from 'src/app/shared/models/report';

@Component({
  selector: 'app-list-reports',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule],
  templateUrl: './list-reports.component.html',
  styleUrls: ['./list-reports.component.scss']
})
export class ListReportsComponent implements OnInit {
  @Input() members: Member[] = [];
  filteredMembers: Member[] = []; // Array to hold filtered members
  filterText: string = ''; // To hold the filter text

  constructor(private memberService: MemberService) {}

  ngOnInit(): void {
    this.filteredMembers = [...this.members];
  }

  filterMembers() {
    if (!this.filterText) {
      this.filteredMembers = [...this.members];
    } else {
      this.filteredMembers = this.members.filter(member =>
        member.name.toLowerCase().includes(this.filterText.toLowerCase()) ||
        member.lastName.toLowerCase().includes(this.filterText.toLowerCase())
      );
    }
  }

  viewFile(report: Report) {
    this.memberService.getFileUrl(report.path).subscribe(
      (url: string) => {
        window.open(url, '_blank');
      },
      (error) => {
        console.error('Error getting file URL:', error);
        // Handle error (e.g., show an error message to the user)
      }
    );
  }

  toggleMember(member: Member): void {
    (member as any).isOpen = !(member as any).isOpen;
  }
}
