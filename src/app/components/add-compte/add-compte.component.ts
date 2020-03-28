import { Partenaire } from './../../modele/partenaire';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServiceService } from 'src/app/service/user-service.service';
import { PartenaireServiceService } from 'src/app/service/partenaire-service.service';
import { CompteService } from 'src/app/service/compte.service';
import { User } from 'src/app/modele/user';

@Component({
  selector: 'app-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.scss']
})
export class AddCompteComponent implements OnInit {
formCompte: FormGroup;
iri = `/api/roles/`;
iri1 = `/api/users/`;
iri2 = `/api/partenaires/`;
error = false;
message: string;
submitted = false;
roles: [];
idUserPartenaire: number;
idPartenaire: number;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserServiceService,
    private partenaireService: PartenaireServiceService,
    private compteService: CompteService,
    ) { }

  ngOnInit() {
    this.createForm();
    this.userService.getRole("PARTENAIRE").subscribe(
      data => {
        this.roles = data['hydra:member'];
      }
    );
  }
  onSubmit() {
    this.submitted = true;
    this.addUser();

  }

  private addUser() {
   // recuperons les valeurs du formulaire
   const user = {
    username : this.formCompte.value.username,
    password : this.formCompte.value.password,
    nom : this.formCompte.value.nom,
    prenom : this.formCompte.value.prenom,
    adresse : this.formCompte.value.adresse,
    email : this.formCompte.value.email,
    telephon : this.formCompte.value.telephon,
    role : `${this.iri}${this.formCompte.value.role}` ,
    dateNaissance : this.formCompte.value.dateNaissance,
    isActive : this.formCompte.value.isActive,
  };
   this.userService.postOrPutUser(user).subscribe(
   data => {
           this.idUserPartenaire = data['id'];
           console.log(this.idUserPartenaire);
           this.addPartenaire();
        },
        error => {
        this.error = true;
        console.log(error);
        this.message = "erreur sur les informations personnelles  \n NB: username doit etre unique";
              }
        );
  }
  // creation du partenaire
  private addPartenaire() {
    const partenaire = {
      ninea : this.formCompte.value.ninea,
      registreDuCommerce : this.formCompte.value.registreDuCommerce,
      userPartenaire: `${this.iri1}${this.idUserPartenaire}`
    };
    console.log(partenaire);
    this.partenaireService.postPartenaire(partenaire).subscribe(
      data => {
        this.idPartenaire = data['id'];
        this.addCompte();
      },
      error => {
        this.error = true;
        this.message = "erreur sur le partenaire";
        console.log(error);
        this.userService.deleteById(this.idUserPartenaire).subscribe( res => { console.log(res); });
      }
    );

  }
   // creation du partenaire
   private addCompte() {
    const compte = {
      // tslint:disable-next-line: radix
      solde : parseInt(this.formCompte.value.solde),
      partenaire: `${this.iri2}${this.idPartenaire}`
    };
    this.compteService.postCompte(compte).subscribe(
      data => {
        console.log(data);
        this.router.navigate(['/accueil']);
       },
       error => {
        this.error = true;
        this.partenaireService.deleteById(this.idPartenaire).subscribe(res => { console.log(res); });
        this.userService.deleteById(this.idUserPartenaire).subscribe( res => { console.log(res); });
        console.log(error);
        this.error = true;
        this.message = "erreur sur le compte";
      }
    );

  }
  private createForm() {
    this.formCompte = this.fb.group({
     solde: ['', [Validators.min(500000), Validators.max(2000000), Validators.required]],
     ninea: ['', [Validators.required, Validators.minLength(10)]],
     registreDuCommerce: ['', [Validators.required, Validators.minLength(10)]],
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
  get f() { return this.formCompte.controls; }

}
