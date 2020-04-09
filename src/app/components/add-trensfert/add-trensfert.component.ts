import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TrensfertService } from 'src/app/service/trensfert.service';

@Component({
  selector: 'app-add-trensfert',
  templateUrl: './add-trensfert.component.html',
  styleUrls: ['./add-trensfert.component.scss']
})
export class AddTrensfertComponent implements OnInit {
  formTrensfert: FormGroup;
  submitted = false;
  error: boolean;
  message: string;
  success: boolean;
  code: string;
  retrait: boolean;
  constructor(
    private fb: FormBuilder,
    private trensfertService: TrensfertService,
    ) {
   }
  ngOnInit() {
    this.createForm();
  }
  onSubmit() {
    this.submitted = true;
    this.setSuccess();
    this.setError();
    if (this.formTrensfert.invalid) {
       return;
   }
    const trensfert = {
      nomBeneficiaire : this.formTrensfert.value.nomBeneficiaire ,
      prenomBeneficiaire  : this.formTrensfert.value.prenomBeneficiaire ,
      telBeneficiaire  : this.formTrensfert.value.telBeneficiaire ,
      nomExpediteur : this.formTrensfert.value.nomExpediteur ,
      prenomExpediteur  : this.formTrensfert.value.prenomExpediteur ,
      cniExpediteur : this.formTrensfert.value.cniExpediteur ,
      telExpediteur : this.formTrensfert.value.telExpediteur,
      montant : parseInt(this.formTrensfert.value.montant),
    };
    //console.log(trensfert);
    this.trensfertService.postTrensfert(trensfert).subscribe(
      data => {
        console.log(data);
        this.success = true;
        setTimeout(() => {
          this.success = false;
         }, 100000);
        this.createForm();
        this.code = data["code"];
        this.submitted = false;
      },
      error => {
        this.error = true;
        this.message = error.error["hydra:description"];
        setTimeout(() => {
          this.error = false;
         }, 5000);
        console.log(error);
      }
    );
  }
  get f() { return this.formTrensfert.controls; }
  createForm() {
    this.formTrensfert = this.fb.group({
      nomExpediteur: ['', Validators.required],
      prenomExpediteur: ['', Validators.required],
      telExpediteur: ['',  [Validators.required]],
      cniExpediteur: ['', Validators.required],
      nomBeneficiaire: ['', Validators.required],
      prenomBeneficiaire: ['', Validators.required],
      telBeneficiaire: ['',  [Validators.required]],
      montant: ['', [Validators.required]],
    });
  }
  setSuccess() {
    this.success = false;
  }
  setError() {
    this.error = false;
  }
  setRetrait(b: boolean){
    this.retrait = b;
  }
}
