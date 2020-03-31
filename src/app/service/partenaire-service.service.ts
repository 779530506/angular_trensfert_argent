import { Partenaire } from './../modele/partenaire';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PartenaireServiceService {

  constructor(
    private http: HttpClient,
  ) { }
  postPartenaire(partenaire: Partenaire) {
          return  this.http.post(`${environment.apiUrl}/api/partenaires`, partenaire);
   }
   deletePartenaire(partenaire: Partenaire) {
    // tslint:disable-next-line: align
    return this.http.delete(`${environment.apiUrl}/api/partenaires/${partenaire.id}`);
   }
   deleteById(id: number) {
    // tslint:disable-next-line: align
    return this.http.delete(`${environment.apiUrl}/api/partenaires/${id}`);
   }
   getByNinea(ninea: string) {
      return this.http.get(`${environment.apiUrl}/api/partenaires?ninea=${ninea}`);
   }
}
