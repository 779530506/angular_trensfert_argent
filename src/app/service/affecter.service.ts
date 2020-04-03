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
  postCompte(affecter: Affecter) {
     return  this.http.post(`${environment.apiUrl}/api/affecters`, affecter);
    }
  }