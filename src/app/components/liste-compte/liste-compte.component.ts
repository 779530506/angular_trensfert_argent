import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CompteService } from 'src/app/service/compte.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-liste-compte',
  templateUrl: './liste-compte.component.html',
  styleUrls: ['./liste-compte.component.scss']
})
export class ListeCompteComponent implements OnInit {
comptes: [];
formRecherche: FormGroup;
compteFilter = "";

  constructor(
    private compteService: CompteService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
  this.getComptes();
    // recherche
  this.formRecherche = this.fb.group({
      compteFilter: ['']
     });

  }
    // pour filtrer
    onFilter() { // without type info
      this.compteFilter = this.formRecherche.value.compteFilter;
      this.getComptes();
    }
  onDelete(id: number) {
    this.compteService.deleteCompte(id).subscribe(res => {
       confirm("etes-vous sur de supprimer");
    });
  }
  getComptes() {
    this.compteService.getByNumeroCompte(this.compteFilter).subscribe(
      data => {
        this.comptes = data["hydra:member"];
        console.log(this.comptes);
            }
      );
  }

}
