import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Pais} from '../paises-model';
import {PaisesService} from '../paises-service';
import {UsuarioAutentificacaoModel} from '../../usuario-autentificacao.model';
import {AuthGuard} from '../../guards/auth.guard.service';
import {PaisSiglaEditComponent} from '../pais-sigla-edit/pais-sigla-edit.component';

@Component({
  selector: 'app-pais-update',
  templateUrl: './pais-update.component.html',
  styleUrls: ['./pais-update.component.css']
})
export class PaisUpdateComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute,
              private service: PaisesService, private guard: AuthGuard) {
  }
  siglaEdit: PaisSiglaEditComponent;
  usuarioLogado: UsuarioAutentificacaoModel;
  pais: Pais = {
    gentilico: '',
    id: null,
    nome: '',
    sigla: '',
  };
  private id: number;

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('pais');
    this.usuarioLogado = this.guard.usuarioLogado;
    this.siglaEdit = new PaisSiglaEditComponent();
  }

  updatePais(): void {
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
      this.service.deletarPais(this.id, this.usuarioLogado).subscribe();
      this.service.showMessage('Pais atualizado!');
      this.clean();
    }
  }
  private clean(): void{
    this.router.navigate((['/pais/update']));
    this.pais = new class implements Pais {
      gentilico: string;
      id: number;
      nome: string;
      sigla: string;
    };
  }
}
