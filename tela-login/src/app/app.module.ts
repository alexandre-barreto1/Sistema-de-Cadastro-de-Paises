import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {HttpClientModule} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {AuthService} from './components/auth.service';
import { HomeUsuarioComponent } from './components/template/home-usuario/home-usuario.component';
import {AuthGuard} from './components/guards/auth.guard.service';
import { NavComponent } from './components/template/nav/nav.component';
import { PaisesListComponent } from './components/paises/paises-list/paises-list.component';
import { PaisCreateComponent } from './components/paises/pais-create/pais-create.component';
import { PaisUpdateComponent } from './components/paises/pais-update/pais-update.component';
import { PaisList2Component } from './components/paises/pais-list2/pais-list2.component';
import { PaisSiglaEditComponent } from './components/paises/pais-sigla-edit/pais-sigla-edit.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeUsuarioComponent,
    NavComponent,
    PaisesListComponent,
    PaisCreateComponent,
    PaisUpdateComponent,
    PaisList2Component,
    PaisSiglaEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatSnackBarModule
  ],
  providers: [AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
