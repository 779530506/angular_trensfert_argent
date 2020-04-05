import { User } from './../../modele/user';
import { PartenaireServiceService } from './../../service/partenaire-service.service';
import { AuthServiceService } from './../../authentification/auth-service.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CompteService } from 'src/app/service/compte.service';
import { UserServiceService } from 'src/app/service/user-service.service';
import { Partenaire } from 'src/app/modele/partenaire';
import { Collection } from 'ngx-pagination/dist/paginate.pipe';
import { AffecterService } from 'src/app/service/affecter.service';
import { Affecter } from 'src/app/modele/affecter';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-add-affecter',
  templateUrl: './add-affecter.component.html',
  styleUrls: ['./add-affecter.component.scss']
})
export class AddAffecterComponent implements OnInit {
  formAffecter: FormGroup;
  message: string;
  submitted = false;
  error: boolean;
  idPartenaire: number;
  username: string;
  success: boolean; // si le depot est ok
  comptes: [];
  partenaire: Partenaire;
  users: [];
  affecters: [];
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private auth: AuthServiceService,
      private partenaireService: PartenaireServiceService,
      private affecterService: AffecterService,
      private userService: UserServiceService,
      ) { }
    ngOnInit() {
      this.createForm();
      this.setComptesEtUsers();
      //console.log(this.comptes);
     // console.log(this.users);
      // console.log(this.getcompte());

    }
    setComptesEtUsers() {
      this.username = this.auth.getUsername();
      return this.partenaireService.getUserPartenaire(this.username).subscribe(
        data => {
          const nbrReponse = data["hydra:totalItems"];
          if ( nbrReponse > 0) { // si c'est partenaire
            this.comptes = data['hydra:member'][0].comptes ;
            this.users = data['hydra:member'][0].users ;
            this.idPartenaire = data['hydra:member'][0].id;
            this.getAffecterActuelle();
            //console.log(data['hydra:member'][0].id);
          } else { // si c'est un admin partenaire
          return this.userService.getUsers(this.username).subscribe(
            datas => {
              this.idPartenaire = datas['hydra:member'][0].partenaire.id; // recuperons id du partenaire pour avoir les user
              this.comptes = datas['hydra:member'][0].partenaire.comptes ;
              this.userService.getByIdPartenaire(this.idPartenaire).subscribe(
                user => {
                  this.users = user["hydra:member"];
                  this.getAffecterActuelle();

                }
              ) ;

            }
          );
          }

        },
        error => {
          console.log(error);
        }
      );
    }
    onSubmit() {
      this.submitted = true;
      this.error = false;
      this.success = false;
      if (this.formAffecter.invalid) {
         return;
     }
      this.postAffecter();

    }
    postAffecter() {
      const affecter = {
        dateDebut : this.formAffecter.value.dateDebut,
        dateFin : this.formAffecter.value.dateFin,
        userAffecter : this.formAffecter.value.userAffecter,
        compteAffecter : this.formAffecter.value.compteAffecter,
       }
      this.affecterService.postAffecter(affecter).subscribe(
        data => {
          console.log(data);
          this.success = true;
          this.submitted = false;
          this.createForm();
          this.getAffecterActuelle();
          setTimeout(() => {
            this.success = false;
           }, 5000);
        },
        error => {
         console.log(error.error["hydra:description"]);
         this.message = error.error["hydra:description"];
         this.error = true;
         setTimeout(() => {
          this.error = false;
         }, 5000);
        }
      );
      console.log(affecter);
     }
    private createForm() {
      this.formAffecter = this.fb.group({
       dateDebut: ['', [ Validators.required]],
       dateFin: ['', [Validators.required]],
       userAffecter: ['', [ Validators.required]],
       compteAffecter: ['', [ Validators.required]],
      });
    }
    get f() { return this.formAffecter.controls; }
    setCouleur(color: string) {
      return  color;
    }
    setSuccess() {
      this.success = false;
    }
    getAffecterActuelle() {
       const date = formatDate(new Date(), 'yyyy-MM-dd', 'en');
       console.log(this.idPartenaire);
       this.affecterService.getAffecterActuelle(date, this.idPartenaire).subscribe(
       data => {
         this.affecters = data["hydra:member"];
         //console.log(this.idPartenaire);
         //console.log(data);
       }
     );
    }
    onDelete(id: number) {
      this.affecterService.deleteAffecter(id).subscribe(
        data => {
         confirm("Etes-vous sur de vouloir supprimer");
         this.getAffecterActuelle();
        }
      );
    }
}
