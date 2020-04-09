import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Trensfert } from '../modele/trensfert';
import { Retrait } from '../modele/retrait';

@Injectable({
  providedIn: 'root'
})
export class TrensfertService {
  constructor(
    private http: HttpClient,
  ) { }
  postTrensfert(trensfert: Trensfert) {
          return  this.http.post(`${environment.apiUrl}/api/transactions`, trensfert);
   }
  getTrensfert(code: number) {
    return  this.http.get(`${environment.apiUrl}/api/transactions?status=true&code=${code}`);
}
  putTrensfert(retrait: Retrait) {
    return  this.http.put(`${environment.apiUrl}/api/transactions/${retrait.id}`, retrait);
}
}
