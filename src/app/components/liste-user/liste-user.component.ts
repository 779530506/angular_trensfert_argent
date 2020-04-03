import { AuthServiceService } from './../../authentification/auth-service.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/service/user-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/modele/user';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.scss']
})
export class ListeUserComponent implements OnInit {
  users: [];
  showModal: boolean;
  view: boolean; // modal view
  submitted = false;
  erreur = false;
  formUser: FormGroup;
  formRecherche: FormGroup;
  contrainte: boolean; // pour verifier si l'utisateur n'est pas supprimé
  roles: [];
  iri = `/api/roles/` ;
  user: User;
  utilisateur: User;
  userFilter = "";


  constructor(private fb: FormBuilder, private userService: UserServiceService, private router: Router  ) { }

  ngOnInit() {
   this.getUser();
   this.createForm();
   this.getRole();
   // recherche
   this.formRecherche = this.fb.group({
    userFilter: ['']
   });

  }
  // pour filtrer
  onFilter() { // without type info
    this.userFilter = this.formRecherche.value.userFilter;
    console.log(this.userFilter);
    this.getUser();
  }
  getRole() {
    return  this.userService.getRoles().subscribe(
      data => {
        this.roles = data['hydra:member'];
      }
    );
  }
  createForm() {
    return    this.formUser = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['',  [Validators.required, Validators.email]],
      adresse: ['', Validators.required],
      telephon: ['', [Validators.required, Validators.minLength(9)]],
      dateNaissance: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4)]],
      isActive: [true],
      role: ['', Validators.required],
        id: []
    });
  }
  getUser() {
    return   this.userService.getUsers(this.userFilter).subscribe(
      data => {
        this.users = data["hydra:member"];
      },
      error => {
        console.log(error);
      }
    );
  }
  show()
  {
    this.createForm();
    //this.formUser.reset();
    this.showModal = true; // Show-Hide Modal Check
  }
  //Bootstrap Modal Close event
  hide()
  {
    this.showModal = false;
  }
  onStatus(id: number) {
    this.userService.getStatus(id).subscribe(
      data => {
        alert(JSON.stringify(data["message"]));
             // tslint:disable-next-line: align
             this.userService.getUsers().subscribe(
              datas => {
              //this.users = datas["hydra:member"];
              this.onFilter();
             },
            error => {
              console.log(error);
            }
          );
      }
      );
  }
  // convenience getter for easy access to form fields
get f() { return this.formUser.controls; }
onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.formUser.invalid) {
        return;
    }
    console.log(this.formUser.value);
    this.onAdd();
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
    id: this.formUser.value.id
  };
  // appel a la methode post ou put selon si id existe ou non
  //console.log(user);
  this.userService.postOrPutUser(user).subscribe(
  res => {
              this.showModal = false;
              this.submitted = false;
              this.getUser();
      },
      error => {
        this.erreur = true;
      // console.log(this.erreur);
      }
       );
}
edit(u: User) {
  this.formUser = this.fb.group({
    nom: [u.nom],
    prenom: [u.prenom],
    email: [u.email],
    adresse: [u.adresse],
    telephon: [u.telephon],
    dateNaissance: [u.dateNaissance],
    username: [u.username],
    password: [u.password],
    isActive: [u.isActive],
    role: [u.role['id']],
    id: [u.id]
});
  this.showModal = true;
  console.log(u);
}
setErreur(){
  this.erreur = false;
}
setCouleur(color: string){
  return  color;
}
showView() {
  this.view = true;
}
hideView() {
  this.view = false;
}
onDelete(user: User) {
  this.userService.deleteUser(user).subscribe(
    res => {
      this.view = false;
      this.getUser();
    },
    error => {
      this.contrainte = true;
    }
  );
}
setContrainte() {
  this.contrainte = false;
  this.view = false;
}
afficher(utilisateur: User) {
  this.view = true;
  this.utilisateur = utilisateur;
}
}
