import { Component, OnInit } from '@angular/core';
import {UsuarioAutentificacaoModel} from '../../usuario-autentificacao.model';
import {LoginComponent} from '../../login/login.component';
import {AuthGuard} from '../../guards/auth.guard.service';

@Component({
  selector: 'app-home-usuario',
  templateUrl: './home-usuario.component.html',
  styleUrls: ['./home-usuario.component.css']
})
export class HomeUsuarioComponent implements OnInit {

  constructor(private guard: AuthGuard) { }
  usuarioLogado: UsuarioAutentificacaoModel;
  ngOnInit(): void {
    this.usuarioLogado = this.guard.retonarUsuarioLogado();
  }

  logout(): void{
    this.guard.logout();
  }
  }
