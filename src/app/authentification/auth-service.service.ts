import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Role } from './../modele/role';
import { User } from './../modele/user';
import { BehaviorSubject } from 'rxjs';

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
     pipe(map(user => {
       localStorage.setItem('currentUser', JSON.stringify(user));
      // tslint:disable-next-line: align
      this.currentUserSubject.next(user);
       return user;
   }));
  }
}
