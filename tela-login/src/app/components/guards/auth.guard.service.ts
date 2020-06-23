import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {UsuarioAutentificacaoModel} from '../usuario-autentificacao.model';
import {Observable} from 'rxjs';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(private router: Router, private authService: AuthService) { }
  usuarioLogado: UsuarioAutentificacaoModel;
  private statusTolken: boolean;
  usuarioModel(usuario: UsuarioAutentificacaoModel){
    localStorage.setItem('administrador', String(usuario.administrador));
    localStorage.setItem('autenticado', String(usuario.autenticado));
    localStorage.setItem('login', usuario.login);
    localStorage.setItem('nome', usuario.nome);
    localStorage.setItem('token', usuario.token);

    return this.usuarioLogado = usuario;
  }
  retonarUsuarioLogado(){
    return this.usuarioLogado;
  }
  isAdministrador(): boolean{
    return this.usuarioLogado.administrador;
  }
  private isAutenticado(): boolean{
    if (this.usuarioLogado === undefined){
      this.usuarioLogado = new class implements UsuarioAutentificacaoModel {
        administrador: boolean;
        autenticado: boolean;
        login: string;
        nome: string;
        token: string;
      };
      this.usuarioLogado.administrador = JSON.parse(localStorage.getItem('administrador')),
        this.usuarioLogado.autenticado = JSON.parse(localStorage.getItem('autenticado')),
        this.usuarioLogado.login = localStorage.getItem('login'),
        this.usuarioLogado.nome = localStorage.getItem('nome'),
        this.usuarioLogado.token = localStorage.getItem('token');

      return this.usuarioLogado.autenticado;
    }
    return this.usuarioLogado.autenticado;
  }
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.isAutenticado()){
      this.authService.renovarToken(this.usuarioLogado.token).subscribe(status => {
        this.statusTolken = status.valueOf();
      });
      return true;
    }else{
      if (this.statusTolken === undefined){
        this.authService.showMessage('Usuario não encontrado', true);
      }
      this.router.navigate((['/']));
    }
    return false;
  }
}
