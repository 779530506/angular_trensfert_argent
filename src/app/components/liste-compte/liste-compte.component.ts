import { Component, OnInit } from '@angular/core';
import { CompteService } from 'src/app/service/compte.service';

@Component({
  selector: 'app-liste-compte',
  templateUrl: './liste-compte.component.html',
  styleUrls: ['./liste-compte.component.scss']
})
export class ListeCompteComponent implements OnInit {
comptes: [];
  constructor(
    private compteService: CompteService,
  ) { }

  ngOnInit() {
  this.compteService.getComptes().subscribe(
  data => {
    this.comptes = data["hydra:member"];
    console.log(this.comptes);
        }
  );

  }
  onDelete(id: number) {
    this.compteService.deleteCompte(id).subscribe(res => {
       confirm("etes-vous sur de supprimer");
    });
  }

}
