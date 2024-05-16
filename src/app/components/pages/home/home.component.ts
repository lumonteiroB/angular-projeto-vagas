import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Categorias } from 'src/app/core/models/categorias';
import { ConteudoSite } from 'src/app/core/models/conteudo-site';
import { Empresa } from 'src/app/core/models/empresa';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { ConteudoSiteService } from 'src/app/core/services/conteudo-site.service';
import { EmpresasService } from 'src/app/core/services/empresas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, RouterModule {

  allCategorias: Categorias[] = []
  allEmpresas: Empresa[] = []
  conteudoHome: ConteudoSite = new ConteudoSite()

  constructor(
    private categServ: CategoriasService,
    private empresaServ: EmpresasService,
    private conteudoServ: ConteudoSiteService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pegarConteudo()
  }

  pegarConteudo(): void {
    this.conteudoServ.getAll().subscribe({
      next: (res) => {
        this.conteudoHome = res
        this.pegarCateg()
      }
    })
  }

  pegarCateg(): void {
    this.categServ.getAll().subscribe({
      next: (resposta) => {
        this.allCategorias = resposta
        this.pegarEmpresas()
      }, error: (erro) => {
        console.log(erro)
      }
    })
  }

  pegarEmpresas(): void {
    this.empresaServ.getAll().subscribe({
      next: (resposta) => {
        this.allEmpresas = resposta
      }, error: (erro) => {
        console.log(erro)
      }
    })
  }
  
  fromInternaCateg(obj: Categorias) {
    localStorage.removeItem('objEmpresa');
    localStorage.removeItem('objCateg');
    localStorage.setItem('objCateg', JSON.stringify(obj));
    this.router.navigate(['interna'])
  }

  fromInternaEmpresa(obj: Empresa) {
    localStorage.removeItem('objEmpresa');
    localStorage.removeItem('objCateg');
    localStorage.setItem('objEmpresa', JSON.stringify(obj));
    this.router.navigate(['interna'])
  }
}
