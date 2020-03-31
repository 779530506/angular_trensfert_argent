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
import { AddCompteComponent } from './components/add-compte/add-compte.component';
import { ListeUserComponent } from './components/liste-user/liste-user.component';
import { ViewUserComponent } from './components/view-user/view-user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { AddPartenaireComponent } from './components/add-partenaire/add-partenaire.component';
import { CompteComponent } from './components/compte/compte.component';
import { ListeCompteComponent } from './components/liste-compte/liste-compte.component';


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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    AuthServiceService,
    UserServiceService,
    AuthGuard,
    PartenaireServiceService,
    CompteService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
