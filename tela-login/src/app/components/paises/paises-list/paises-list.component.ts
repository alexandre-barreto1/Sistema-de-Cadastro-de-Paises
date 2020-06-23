import {AfterViewInit, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Pais} from '../paises-model';
import {PaisesService} from '../paises-service';
import {AuthGuard} from '../../guards/auth.guard.service';
import {UsuarioAutentificacaoModel} from '../../usuario-autentificacao.model';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {PaisesListDatasource} from './paises-list-datasource';

@Component({
  selector: 'app-pais-create',
  templateUrl: './paises-list.component.html',
  styleUrls: ['./paises-list.component.css']
})
export class PaisesListComponent implements AfterViewInit, OnInit{
  dataSource: MatTableDataSource<Pais> ;
  @ViewChild(MatSort, { static: false }) set ms(sort: MatSort){
  this.dataSource.sort = sort;
  }
  @ViewChild(MatPaginator, { static: false }) set mp(paginator: MatPaginator){
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatTable) table: MatTable<Pais>;
  constructor(private service: PaisesService, private authGuard: AuthGuard) {}

  displayedColumns = ['name', 'sigla'];
  paises: Pais[] = [{nome : '', gentilico : '', id : null, sigla : ''}];
  private usuario: UsuarioAutentificacaoModel;

  ngOnInit(): void {
    this.administrador();
    this.usuario = this.authGuard.usuarioLogado;
    this.dataSource = new MatTableDataSource(this.paises);
  }
  ngAfterViewInit(){
    this.listarPaises();
  }
  administrador(){
    if (this.authGuard.isAdministrador()){
      this.displayedColumns = ['name', 'sigla', 'action'];
    }
  }
  deletarPais(id: number){
    this.service.deletarPais(id, this.usuario).subscribe();
    this.service.showMessage('Pais deletado com sucesso !', true);
    this.listarPaises();
  }
  private listarPaises(): void{
    this.service.buscarPaises(this.usuario).subscribe(listaPaises => {
      this.paises = listaPaises;
      this.dataSource.data = this.paises;
      this.table.dataSource = this.dataSource;
    });
  }
}
