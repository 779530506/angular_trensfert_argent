import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartenaireServiceService } from 'src/app/service/partenaire-service.service';
import { CompteService } from 'src/app/service/compte.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.scss']
})
export class CompteComponent implements OnInit {
  formCompte: FormGroup;
  submitted = false;
  noPartenaire: boolean;
  success: boolean;
  partenaire: string;
<<<<<<< HEAD
  error: boolean;
  message: string;
=======
>>>>>>> 585d63fead578fab9ec975b6fcab997318c5702c
  numeroCompte: string;
    constructor(
      private fb: FormBuilder,
      private router: Router,
      private partenaireService: PartenaireServiceService,
      private compteService: CompteService,
      ) { }
    ngOnInit() {
      this.createForm();
    }
    onSubmit() {
      this.submitted = true;
      const ninea = this.formCompte.value.ninea;
      console.log(ninea);
      this.partenaireService.getByNinea(this.formCompte.value.ninea).subscribe(
        data => {
         const nbr = data["hydra:totalItems"];
<<<<<<< HEAD
         if (nbr === 1) {
=======
         if (nbr > 0) {
>>>>>>> 585d63fead578fab9ec975b6fcab997318c5702c
          this.partenaire = data["hydra:member"][0]['@id'];
          this.addCompte();
         } else {
           this.noPartenaire =  true;
<<<<<<< HEAD
           setTimeout(() => {
            this.noPartenaire = false;
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

  // creation du partenaire
     private addCompte() {
      const compte = {
        // tslint:disable-next-line: radix
        solde : parseInt(this.formCompte.value.solde),
        partenaire: `${this.partenaire}`
      };
      console.log(compte);
      this.compteService.postCompte(compte).subscribe(
        data => {
          console.log(data);
          this.numeroCompte = data['numeroCompte'];
          this.success = true;
<<<<<<< HEAD
          setTimeout(() => {
            this.success = false;
           }, 5000);
          this.submitted = false;
          this.createForm();
=======
          this.submitted = false;
          this.createForm();
         // this.router.navigate(['/liste_compte']);
>>>>>>> 585d63fead578fab9ec975b6fcab997318c5702c
         },
         error => {
          console.log(error);
          this.error = true;
          setTimeout(() => {
            this.error = false;
           }, 5000);
          this.message = error.error["hydra:description"]
        }
      );

    }
    private createForm() {
      this.formCompte = this.fb.group({
       solde: ['', [Validators.min(500000), Validators.max(2000000), Validators.required]],
       ninea: ['', [Validators.required, Validators.minLength(10)]],
      });
    }
    get f() { return this.formCompte.controls; }
    setNoPartenaire() {
      this.noPartenaire = false;
    }
    setCouleur(color: string) {
      return  color;
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
}
