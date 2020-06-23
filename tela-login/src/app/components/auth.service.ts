import { Injectable } from '@angular/core';
import {UsuarioAutentificacaoModel} from './usuario-autentificacao.model';
import {EMPTY, observable, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Usuario} from './login/usuario';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  login(usuario: Usuario): Observable<UsuarioAutentificacaoModel>{
    return this.http.post<UsuarioAutentificacaoModel>
    ('http://localhost:8090/usuario/autenticar?login=' + usuario.login + '&senha=' + usuario.senha, usuario).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  renovarToken(token: string): Observable<boolean>{
    return this.http.get<boolean>('http://localhost:8090/usuario/renovar-ticket?token=' + token).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  showMessage(msg: string, isError: boolean = false): void{
    this.snackBar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: isError ? ['msg-erro'] : ['msg-success'],
    });
  }
  errorHandler(e: any): Observable<any>{
    this.showMessage('Ocorreu um erro', true);
    return EMPTY;
  }
}
