import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  homeLink: string = '/';
  buttonText: string = 'Retour à l\'accueil';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const userRole = this.authService.getUserRole();
    switch(userRole) {
      case 'CHEF':
        this.homeLink = '/chef/dashboard';
        this.buttonText = 'Return to Dashboard';
        break;
      case 'USER':
        this.homeLink = '/acceuil/default';
        this.buttonText = 'Return to Dashboard';
        break;
      default:
        this.homeLink = '/';
        this.buttonText = 'Retour à l\'accueil';
    }
  }
}