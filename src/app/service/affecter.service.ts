import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Affecter } from '../modele/affecter';

@Injectable({
  providedIn: 'root'
})
export class AffecterService {
  constructor(
    private http: HttpClient,
  ) { }
  postAffecter(affecter: Affecter) {
     return  this.http.post(`${environment.apiUrl}/api/affecters`, affecter);
    }
  getAffecter() {
      return  this.http.get(`${environment.apiUrl}/api/affecters`);
     }
  getAffecterActuelle(date: string, id: number) {
      return  this.http.get(`${environment.apiUrl}/api/affecters?dateFin[after]=${date}&compteAffecter.partenaire.id=${id}`);
     }
  deleteAffecter(id: number) {
      return  this.http.delete(`${environment.apiUrl}/api/affecters/${id}`);
     }
}