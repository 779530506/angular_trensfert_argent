import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from '../../modele/user';
import { UserServiceService } from '../../service/user-service.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  user: User;

  constructor(
    private service: UserServiceService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id: string = params['id'];
      this.service.getUser(id).subscribe(
        data => {
          this.user = data;
        }
      );
    });
  }
  onDelete(user: User) {
    this.service.deleteUser(user).subscribe(
      res => {
        this.router.navigate(['/liste_user']);
      }
    );
  }


}
