import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Role } from './../modele/role';
import { User } from './../modele/user';
import { BehaviorSubject } from 'rxjs';
import { jwt_decode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private currentUserSubject: BehaviorSubject<User>;
  constructor(
    private http: HttpClient,
      ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
       }

   public get currentUserValue(): User {
    return this.currentUserSubject.value;
   }

   getConnexion(user: User) {
    return this.http.post<User>(`${environment.apiUrl}/api/login_check`, user).
     // tslint:disable-next-line: no-shadowed-variable
     pipe(map(data => {
      // console.log(data);
       localStorage.setItem('username', JSON.stringify(user.username));
       localStorage.setItem('currentUser', JSON.stringify(data));
      // tslint:disable-next-line: align
      this.currentUserSubject.next(data);
       return user;
   }));
  }
  logout() {
    localStorage.clear();
  }
  getUsername() {
    return JSON.parse(localStorage.getItem('username'));
  }
}
