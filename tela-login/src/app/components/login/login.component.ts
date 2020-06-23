import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {Usuario} from './usuario';
import {AuthGuard} from '../guards/auth.guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: AuthService, private guard: AuthGuard, private router: Router) {}
  usuario: Usuario = {
    login: '',
    senha: '',
  };
  ngOnInit(): void {
  }

  login(){
    if (this.usuario.senha.length === 0 || this.usuario.login.length === 0){
      this.service.showMessage('O campo de nome ou senha está vazio', true);
    }
    this.service.login(this.usuario).subscribe(usuarioAutenticado => {
      this.guard.usuarioModel(usuarioAutenticado);
      this.router.navigate((['home/usuario']));
    });
  }

}
