import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-compte',
  templateUrl: './add-compte.component.html',
  styleUrls: ['./add-compte.component.scss']
})
export class AddCompteComponent implements OnInit {
formCompte: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit() {
    this.createForm();
  }
  onSubmit() {
    console.log(this.formCompte.value);
  }
  private createForm() {
    this.formCompte = this.fb.group({
     solde: [],
     ninea: [''],
     registreDuCommerce: [''],
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
  }

}
