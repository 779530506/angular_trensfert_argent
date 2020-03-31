import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compte } from '../modele/compte';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  constructor(
    private http: HttpClient,
  ) { }
  postCompte(compte: Compte) {
          return  this.http.post(`${environment.apiUrl}/api/comptes`, compte);
   }
   getComptes() {
    return  this.http.get(`${environment.apiUrl}/api/comptes`);
   }
   deleteCompte(id: number){
    return  this.http.delete(`${environment.apiUrl}/api/comptes/${id}`);
   }
}
