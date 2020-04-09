import { Trensfert } from './../../modele/trensfert';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrensfertService } from 'src/app/service/trensfert.service';


@Component({
  selector: 'app-add-retrait',
  templateUrl: './add-retrait.component.html',
  styleUrls: ['./add-retrait.component.scss']
})
export class AddRetraitComponent implements OnInit {
formRecherche: FormGroup;
trensfert: Trensfert;
formRetrait: FormGroup;
noCode: boolean;
existe: boolean;
error: boolean;
success: boolean;
message: string;
submitted: boolean;  // form recherche
submitteds: boolean; // form retrait
  constructor(
   private http: HttpClient,
   private fb: FormBuilder,
   private trensfertService: TrensfertService,
  ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.formRecherche = this.fb.group({
      code: ['', [Validators.required]],
    });
    this.formRetrait = this.fb.group({
      cniBeneficiaire: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
    });
  }
  onSubmit() {
    this.submitteds = true;
    if (this.formRetrait.invalid) {
       return;
   }
    const retrait = {
      cniBeneficiaire : this.formRetrait.value.cniBeneficiaire,
      id: this.trensfert.id
    };
    console.log(this.trensfert.cniBeneficiaire);
    this.trensfertService.putTrensfert(retrait).subscribe(
      data => {
        console.log(data);
        this.success = true;
        setTimeout(() => {
          this.success = false;
         }, 10000);
        this.message = "retrait effectué avec succés";
        this.createForm();
        this.submitted = false;
        this.submitteds = false;
      },
      error => {
        this.error = true;
        this.message = error.error["hydra:description"];
      }
    );
  }
  onRechcherche() {
    this.submitted = true;
    this.existe = false;
    if (this.formRecherche.invalid) {
       return;
   }
    const code = parseInt(this.formRecherche.value.code);
   // console.log(code);
    this.trensfertService.getTrensfert(code).subscribe(
      data => {
        const nbr = data["hydra:totalItems"];
        if (nbr === 1) {
          this.trensfert = data["hydra:member"][0];
          this.existe = true;
        } else {
          this.noCode = true;
          this.existe = false;
          setTimeout(() => {
            this.noCode = false;
           }, 10000);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  putTrenfert() {
    this.trensfertService.putTrensfert(this.trensfert).subscribe(
      data => {
        console.log(data);
      }
    )
  }
get f() {
  return this.formRecherche.controls;
}
get form() {
  return this.formRetrait.controls;
}
}
