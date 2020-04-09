import { AddRetraitComponent } from './components/add-retrait/add-retrait.component';
import { AddTrensfertComponent } from './components/add-trensfert/add-trensfert.component';
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
import { AddDepotComponent } from './components/add-depot/add-depot.component';
import { AddAffecterComponent } from './component/add-affecter/add-affecter.component';




const routes: Routes = [
  { path: '', component: LoginComponent},
  {
    path: '', component: DefaultComponent,
    children: [
     { path: 'accueil', component: DashboardComponent,  canActivate: [AuthGuard] },
     { path: 'add_compte', component: AddCompteComponent,  canActivate: [AuthGuard]},
     { path: 'add_affecter', component: AddAffecterComponent,  canActivate: [AuthGuard]},
     { path: 'add_trensfert', component: AddTrensfertComponent,  canActivate: [AuthGuard]},
     { path: 'add_retrait', component:  AddRetraitComponent,  canActivate: [AuthGuard]},
     { path: 'create_compte', component: CompteComponent,  canActivate: [AuthGuard]},
     { path: 'liste_compte', component: ListeCompteComponent,  canActivate: [AuthGuard]},
     { path: 'liste_user', component: ListeUserComponent, canActivate: [AuthGuard] },
     { path: 'view_user/:id', component:  ViewUserComponent, canActivate: [AuthGuard] },
     { path: 'add_depot', component:  AddDepotComponent, canActivate: [AuthGuard] },
     { path: 'edit_user/:id', component:  AddUserComponent, canActivate: [AuthGuard] },
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
