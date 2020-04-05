import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepotService } from 'src/app/service/depot.service';
import { CompteService } from 'src/app/service/compte.service';


@Component({
  selector: 'app-add-depot',
  templateUrl: './add-depot.component.html',
  styleUrls: ['./add-depot.component.scss']
})
export class AddDepotComponent implements OnInit {
  formDepot: FormGroup;
  submitted = false;
<<<<<<< HEAD
  error: boolean;
  message: string;
=======
>>>>>>> 585d63fead578fab9ec975b6fcab997318c5702c
  success: boolean; // si le depot est ok
  limit: boolean; // si le solde ateint la limit
  noCompte: boolean;
  compte: string;
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private depotService: DepotService,
      private compteService: CompteService,
      ) { }
    ngOnInit() {
      this.createForm();
    }
    onSubmit() {
      this.submitted = true;
<<<<<<< HEAD
=======
     // this.setNoCompte();
      //this.setSuccess();
>>>>>>> 585d63fead578fab9ec975b6fcab997318c5702c
      if (this.formDepot.invalid) {
         return;
     }
      const numeroCompte = this.formDepot.value.numeroCompte;
      this.compteService.getByNumeroCompte(numeroCompte).subscribe(
        data => {
          const nbr = data["hydra:totalItems"];
<<<<<<< HEAD
          console.log(nbr);
=======
>>>>>>> 585d63fead578fab9ec975b6fcab997318c5702c
          if (nbr > 0) {
            this.compte = data["hydra:member"][0]['@id'];
            this.addDepot();
          } else {
            this.noCompte =  true;
<<<<<<< HEAD
            setTimeout(() => {
              this.noCompte = false;
             }, 5000);
=======
>>>>>>> 585d63fead578fab9ec975b6fcab997318c5702c
          }
        },
        error => {
          console.log(error);
        }
      );

    }

  // creation du depot
     private addDepot() {
      const depot = {
        // tslint:disable-next-line: radix
        montant : parseInt(this.formDepot.value.montant),
        compte: `${this.compte}`
      };
      console.log(depot);
      this.depotService.postDepot(depot).subscribe(
        data => {
          console.log(data);
          this.success = true;
<<<<<<< HEAD
          setTimeout(() => {
            this.success = false;
           }, 5000);
=======
>>>>>>> 585d63fead578fab9ec975b6fcab997318c5702c
          this.createForm();
          this.submitted = false;
         },
         error => {
          console.log(error);
<<<<<<< HEAD
          this.error = true;
          this.message = error.error["hydra:description"];
          console.log(this.message);
          setTimeout(() => {
            this.error = false;
           }, 5000);
=======
>>>>>>> 585d63fead578fab9ec975b6fcab997318c5702c
          if (error.status === 420) {
            this.limit = true;
          }
        }
      );

    }
    private createForm() {
      this.formDepot = this.fb.group({
       montant: ['', [Validators.min(10000), Validators.max(1500000), Validators.required]],
       numeroCompte: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      });
    }
    get f() { return this.formDepot.controls; }
    setCouleur(color: string){
      return  color;
    }
    setNoCompte(){
      this.noCompte = false;
    }
    setSuccess(){
      this.success = false;
    }
<<<<<<< HEAD
    setError(){
      this.error = false;
    }
=======
>>>>>>> 585d63fead578fab9ec975b6fcab997318c5702c
    setLimit(){
      this.limit = false;
    }

}
