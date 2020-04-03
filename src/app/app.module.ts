import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './layout/navbar/navbar.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DefaultComponent } from './layout/default/default.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './authentification/login/login.component';
import {AuthServiceService} from './authentification/auth-service.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from './helper/interceptor.service';
import { AuthGuard } from './helper/auth.guard';
import { UserServiceService } from './service/user-service.service';
import { PartenaireServiceService } from './service/partenaire-service.service';
import { CompteService } from './service/compte.service';
import { AffecterService } from './service/affecter.service';
import { AddCompteComponent } from './components/add-compte/add-compte.component';
import { ListeUserComponent } from './components/liste-user/liste-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddPartenaireComponent } from './components/add-partenaire/add-partenaire.component';
import { CompteComponent } from './components/compte/compte.component';
import { ListeCompteComponent } from './components/liste-compte/liste-compte.component';
import { AddDepotComponent } from './components/add-depot/add-depot.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddAffecterComponent } from './component/add-affecter/add-affecter.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DefaultComponent,
    FooterComponent,
    DashboardComponent,
    LoginComponent,
    AddCompteComponent,
    ListeUserComponent,
    ViewUserComponent,
    AddUserComponent,
    AddPartenaireComponent,
    CompteComponent,
    ListeCompteComponent,
    AddDepotComponent,
    AddAffecterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [
    AuthServiceService,
    UserServiceService,
    AuthGuard,
    PartenaireServiceService,
    CompteService,
    AffecterService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
