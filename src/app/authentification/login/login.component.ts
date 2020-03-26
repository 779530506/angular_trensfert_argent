import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formUser: FormGroup;
  error: string;
  constructor(
    private fb: FormBuilder,
    private auth: AuthServiceService,
    private router: Router
    ) { }

  ngOnInit() {
    this.formUser = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  onSubmit() {
    const user = {
      username : this.formUser.value.username,
      password : this.formUser.value.password,
    };
    this.auth.getConnexion(user).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/dashboard']);
      },
      error => {
        this.error = 'autorisation refusée';
        console.log(error);
      }
    );
  }

}
