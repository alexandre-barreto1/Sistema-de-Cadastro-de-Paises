import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeUsuarioComponent } from './components/template/home-usuario/home-usuario.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './components/guards/auth.guard.service';
import {PaisesListComponent} from './components/paises/paises-list/paises-list.component';
import {PaisCreateComponent} from './components/paises/pais-create/pais-create.component';
import {PaisUpdateComponent} from "./components/paises/pais-update/pais-update.component";


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home/usuario',
    component: HomeUsuarioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'paises/list',
    component: PaisesListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pais/create',
    component: PaisCreateComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pais/update/:pais',
    component: PaisUpdateComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
