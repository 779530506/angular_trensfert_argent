import { DefaultComponent } from './layout/default/default.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './authentification/login/login.component';
import { AddCompteComponent } from './components/add-compte/add-compte.component';
import { ListeUserComponent } from './components/liste-user/liste-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AuthGuard } from './helper/auth.guard';
import { AddPartenaireComponent } from './components/add-partenaire/add-partenaire.component';
import { CompteComponent } from './components/compte/compte.component';
import { ListeCompteComponent } from './components/liste-compte/liste-compte.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  {
    path: '', component: DefaultComponent,
    children: [
     { path: 'accueil', component: DashboardComponent },
     { path: 'add_compte', component: AddCompteComponent},
     { path: 'create_compte', component: CompteComponent},
     { path: 'liste_compte', component: ListeCompteComponent},
     { path: 'liste_user', component: ListeUserComponent },
     { path: 'view_user/:id', component:  ViewUserComponent },
     { path: 'add_user', component:  AddUserComponent },
     { path: 'edit_user/:id', component:  AddUserComponent },
    ],
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
