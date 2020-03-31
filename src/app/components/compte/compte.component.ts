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
  partenaire: string;
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
          this.partenaire = data["hydra:member"][0]['@id'];
          this.addCompte();
         // console.log(data["hydra:member"][0]['@id']);
        },
        error => {
          console.log(error);
        }
      );
      //if (!this.idPartenaire >= 1 ) {
        //this.addCompte();
     // }
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
          this.router.navigate(['/liste_compte']);
         },
         error => {
          console.log(error);
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
}
