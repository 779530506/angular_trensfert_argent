import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { Role } from './../modele/role';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../modele/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private httpClient: HttpClient) {
  }
   getRoles() {
    return this.httpClient.get<Role>(`${environment.apiUrl}/api/roles`);
   }

   getRole(libelle: string) {
    return this.httpClient.get<Role>(`${environment.apiUrl}/api/roles?libelle=${libelle}`);
   }
   getUsers() {
   return this.httpClient.get<User>(`${environment.apiUrl}/api/users`);
  }
   getUser(id: any): Observable<User> {
   return this.httpClient.get<User>(`${environment.apiUrl}/api/users/${id}`);
   }

   postOrPutUser(user: User) {
   console.log(user.id);
   if (user.id >= 1) {
     return this.httpClient.put<User>(`${environment.apiUrl}/api/users/${user.id}`, user);
   } else {
         return  this.httpClient.post(`${environment.apiUrl}/api/users`, user);
       }
  }
   deleteUser(user) {
    // tslint:disable-next-line: align
    return this.httpClient.delete(`${environment.apiUrl}/api/users/${user.id}`);
   }
   deleteById(id: number) {
    // tslint:disable-next-line: align
    return this.httpClient.delete(`${environment.apiUrl}/api/users/${id}`);
   }
   getStatus(id)
   {
   return this.httpClient.get(`${environment.apiUrl}/api/users/status/${id}`);
   }
}
