import { Component, OnInit } from '@angular/core';
import {Pais} from '../paises-model';
import {PaisesService} from '../paises-service';
import {UsuarioAutentificacaoModel} from '../../usuario-autentificacao.model';
import {AuthGuard} from '../../guards/auth.guard.service';
import {Router} from '@angular/router';
import {PaisSiglaEditComponent} from '../pais-sigla-edit/pais-sigla-edit.component';
@Component({
  selector: 'app-pais-create',
  templateUrl: './pais-create.component.html',
  styleUrls: ['./pais-create.component.css']
})
export class PaisCreateComponent implements OnInit {

  constructor(private service: PaisesService, private authGuard: AuthGuard,
              private router: Router) { }

  private usuarioLogado: UsuarioAutentificacaoModel;
  siglaEdit: PaisSiglaEditComponent;

  pais: Pais = {
  gentilico: '',
  id: null,
  nome: '',
  sigla: ''
};
  ngOnInit(): void {
   this.usuarioLogado = this.authGuard.usuarioLogado;
   this.siglaEdit = new PaisSiglaEditComponent();
  }

  createPaises(): void{
    this.pais.sigla = this.siglaEdit.editarSiglas(this.pais.sigla);
    if (this.pais.nome.length === 0){
      this.service.showMessage('O campo de nome do pais deve ser preenchido', true);
      this.clean();
      return null;
    }
    if (this.pais.sigla == null ){
      this.service.showMessage('Por favor digite apenas duas letras na sigla', true);
      return null;
    }else {
      this.service.create(this.pais, this.usuarioLogado).subscribe();
      this.service.showMessage('Pais criado!');
      this.clean();
    }
  }
  private clean(): void{
    this.router.navigate((['/pais/create']));
    this.pais = new class implements Pais {
      gentilico: string;
      id: number;
      nome: string;
      sigla: string;
    };
  }
}
