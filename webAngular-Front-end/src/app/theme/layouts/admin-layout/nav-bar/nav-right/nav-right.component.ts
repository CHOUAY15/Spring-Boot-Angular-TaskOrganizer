// angular import
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

// third party

// icon
import { IconService } from '@ant-design/icons-angular';
import {
  BellOutline,
  SettingOutline,
  GiftOutline,
  MessageOutline,
  PhoneOutline,
  CheckCircleOutline,
  LogoutOutline,
  EditOutline,
  UserOutline,
  ProfileOutline,
  WalletOutline,
  QuestionCircleOutline,
  LockOutline,
  CommentOutline,
  UnorderedListOutline,
  ArrowRightOutline,
  GithubOutline
} from '@ant-design/icons-angular/icons';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-nav-right',
  standalone: true,
  imports: [SharedModule, RouterModule,RouterLink],
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements OnInit {
  @Input() styleSelectorToggle!: boolean;
  @Output() Customize = new EventEmitter();
  windowWidth: number;
  screenFull: boolean = true;

  nomUser: string;
  preNom:string;
  role:string;
  nomDept:string;

  constructor(private iconService: IconService,private authService:AuthenticationService,private route:Router) {
    this.windowWidth = window.innerWidth;
    this.iconService.addIcon(
      ...[
        CheckCircleOutline,
        GiftOutline,
        MessageOutline,
        SettingOutline,
        PhoneOutline,
        LogoutOutline,
        UserOutline,
        EditOutline,
        ProfileOutline,
        QuestionCircleOutline,
        LockOutline,
        CommentOutline,
        UnorderedListOutline,
        ArrowRightOutline,
        BellOutline,
        GithubOutline,
        WalletOutline
      ]
    );
  }
  ngOnInit(): void {
    this.nomUser = this.authService.getCurrentUser().person.name;
    this.preNom = this.authService.getCurrentUser().person.lastName;
    this.role=this.authService.getUserRole();
    // this.nomDept=this.authService.getCurrentUser().person.;
  }

  logOut():void{
    this.authService.logout();
    this.route.navigateByUrl("/")
  }

  profile = [
    {
      icon: 'edit',
      title: 'Edit Profile',
      url:"manager/profil"
    }
  ];

  setting = [
    {
      icon: 'question-circle',
      title: 'Support'
    },
    {
      icon: 'lock',
      title: 'Privacy Center'
    },
    {
      icon: 'comment',
      title: 'Feedback'
    }
  ];
}
