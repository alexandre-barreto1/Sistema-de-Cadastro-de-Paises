import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {Pais} from './paises-model';
import {UsuarioAutentificacaoModel} from '../usuario-autentificacao.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }

  buscarPaises(usuario: UsuarioAutentificacaoModel): Observable<Pais[]>{
    return this.http.get<Pais[]>('http://localhost:8090/pais/listar?token=' + usuario.token).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  deletarPais(paisId: number, usuario: UsuarioAutentificacaoModel): Observable<Pais>{
    return this.http.get<Pais>('http://localhost:8090/pais/excluir?id=' + paisId + '&token=' + usuario.token).pipe(
      map(obj => obj),
      catchError(e => this.errorHandler(e))
    );
  }

  create(pais: Pais, usuario: UsuarioAutentificacaoModel): Observable<any>{
    return this.http.post('http://localhost:8090/pais/salvar?token=' + usuario.token, pais).pipe(
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
