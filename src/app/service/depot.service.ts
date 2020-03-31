import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Depot } from '../modele/depot';


@Injectable({
  providedIn: 'root'
})
export class DepotService {

  constructor(
    private http: HttpClient,
  ) { }

  postDepot(depot: Depot) {
    return  this.http.post(`${environment.apiUrl}/api/depots`, depot);
}
}
