import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from './../../authentification/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from 'src/app/modele/user';
import { UserServiceService } from 'src/app/service/user-service.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  formUser: FormGroup;
  roles: [];
  iri = `/api/roles/` ;
  user: User;

  constructor(private fb: FormBuilder,
              private service: UserServiceService, private route: ActivatedRoute,
              private router: Router) {
   }
  ngOnInit() {
    this.formUser = this.fb.group({
        nom: [],
        prenom: [],
        email: [],
        adresse: [],
        telephon: [],
        dateNaissance: [],
        username: [],
        password: [],
        isActive: [true],
        role: [],
        id: []
    });

    this.service.getRoles().subscribe(
      data => {
        console.log(data);
        this.roles = data['hydra:member'];
      }
    );
    // editer un user
    // remplir le formulaire en cas d'un edit
    this.route.params.subscribe(params => {
      const id: number = params.id;
      if (id >= 1) {
      this.service.getUser(id).subscribe(
        data => {
          this.user = data;
          this.formUser = this.fb.group({
            nom: [this.user.nom],
            prenom: [this.user.prenom],
            email: [this.user.email],
            adresse: [this.user.adresse],
            telephon: [this.user.telephon],
            dateNaissance: [this.user.dateNaissance],
            username: [this.user.username],
            password: [this.user.password],
            isActive: [this.user.isActive],
            role: [this.user.role["id"]],
            id: [this.user.id]
        });
        }
      );
      }
    });
  }
  onAdd() {
    // recuperons les valeurs du formulaire
    const user = {
      username : this.formUser.value.username,
      password : this.formUser.value.password,
      nom : this.formUser.value.nom,
      prenom : this.formUser.value.prenom,
      adresse : this.formUser.value.adresse,
      email : this.formUser.value.email,
      telephon : this.formUser.value.telephon,
      role : `${this.iri}${this.formUser.value.role}` ,
      dateNaissance : this.formUser.value.dateNaissance,
      isActive : this.formUser.value.isActive,
      id : this.formUser.value.id,
    };
    // appel a la methode post ou put selon si id existe ou non
    this.service.postOrPutUser(user).subscribe(
    res => {
                this.router.navigate(['/liste_user']);
        } );
  }

}
