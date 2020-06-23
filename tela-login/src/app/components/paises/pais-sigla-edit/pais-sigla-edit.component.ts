import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pais-sigla-edit',
  templateUrl: './pais-sigla-edit.component.html',
  styleUrls: ['./pais-sigla-edit.component.css']
})
export class PaisSiglaEditComponent implements OnInit {
  constructor() {
  }

  ngOnInit(): void {
  }

  editarSiglas(sigla: string): string{
    const pattern = new RegExp('^([0-9_\\-]+)$');
    sigla = sigla.replace(pattern, '');
    if (sigla.length === 2){
      return sigla.toUpperCase();
    }else{
      return sigla = null;
    }
  }
}
