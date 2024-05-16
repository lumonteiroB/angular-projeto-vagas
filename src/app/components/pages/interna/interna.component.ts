import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/core/models/categorias';
import { Empresa } from 'src/app/core/models/empresa';
import { Vagas } from 'src/app/core/models/vagas/vagas';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { EmpresasService } from 'src/app/core/services/empresas.service';
import { VagasService } from 'src/app/core/services/vagas.service';

@Component({
  selector: 'app-interna',
  templateUrl: './interna.component.html',
  styleUrls: ['./interna.component.scss']
})
export class InternaComponent implements OnInit {

  categoria: Categorias = new Categorias()
  itemEmpresa: Empresa = new Empresa()
  empresas: Empresa[] = []
  listVagas: Vagas[] = []

  titleCabecalhoComp: string = ''
  titleCabecalho: string = ''
  nomeEmpresa: string = ''

  constructor(
    private categServ: CategoriasService,
    private empresaServ: EmpresasService,
    private vagaServ: VagasService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.controlerPag()
  }

  controlerPag() {
    this.itemEmpresa = JSON.parse(localStorage.getItem('objEmpresa') as string)
    this.categoria = JSON.parse(localStorage.getItem('objCateg') as string)
    if (this.itemEmpresa) {
      this.titleCabecalhoComp = 'Vagas Empresa'
      this.titleCabecalho = this.itemEmpresa.nome
      this.pegarVagas(`?empresa=${this.itemEmpresa.id}`)
    }
    if (this.categoria) {
      this.titleCabecalhoComp = 'Vagas Categoria'
      this.titleCabecalho = this.categoria.categoria
      this.pegarVagas(`?categoria=${this.categoria.id}`)
    }
  }

  pegarVagas(url: string): void {
    this.vagaServ.getAll(url).subscribe({
      next: (resposta) => {
        this.listVagas = resposta
        this.pegarEmpresas()
      }, error: (erro) => {
        console.log(erro)
      }
    })
  }

  pegarEmpresas(): void {
    this.empresaServ.getAll().subscribe({
      next: (res) => {
        this.empresas = res
      }
    })
  }

  empresaNome(id: number): string {
    for (let e of this.empresas) {
      if (e.id == id) {
        return e.nome
      }
    }
    return ''
  }

  fromDetalhes(id: number) {
    localStorage.removeItem('idVagaDetalhes');
    localStorage.setItem('idVagaDetalhes', JSON.stringify(id));
    this.router.navigate(['detalhes']);
  }
}
