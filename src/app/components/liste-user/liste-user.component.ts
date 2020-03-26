import { AuthServiceService } from './../../authentification/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.scss']
})
export class ListeUserComponent implements OnInit {
  users: [];

  constructor(private userService: UserServiceService, private router: Router  ) { }

  ngOnInit() {
   this.userService.getUsers().subscribe(
     data => {
       this.users = data["hydra:member"];
     },
     error => {
       console.log(error);
     }
   );
  }
  onStatus(id: number) {
    this.userService.getStatus(id).subscribe(
      data => {
        alert(JSON.stringify(data["message"]));
             // tslint:disable-next-line: align
             this.userService.getUsers().subscribe(
              datas => {
              this.users = datas["hydra:member"];
             },
            error => {
              console.log(error);
            }
          );
      }
      );
  }

}
