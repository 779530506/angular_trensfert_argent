import { Router } from '@angular/router';
import { AuthServiceService } from './../../authentification/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/modele/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  username: string;
  constructor(
    private auth: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit() {
    this.username = JSON.parse(localStorage.getItem('user'));
  }
  onLogout() {
     this.auth.logout();
     this.router.navigate(['']);
      }

}
