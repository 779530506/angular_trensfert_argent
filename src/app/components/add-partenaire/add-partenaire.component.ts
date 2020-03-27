import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-partenaire',
  templateUrl: './add-partenaire.component.html',
  styleUrls: ['./add-partenaire.component.scss']
})
export class AddPartenaireComponent implements OnInit {

  formCompte: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    ) { }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.formCompte = this.fb.group({
     ninea: [''],
     registreDuCommerce: ['']
    });
  }
}
