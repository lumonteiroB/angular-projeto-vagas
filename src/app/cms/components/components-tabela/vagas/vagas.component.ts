import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Categorias } from 'src/app/core/models/categorias';
import { Empresa } from 'src/app/core/models/empresa';
import { Vagas } from 'src/app/core/models/vagas/vagas';
import { CategoriasService } from 'src/app/core/services/categorias.service';
import { EmpresasService } from 'src/app/core/services/empresas.service';
import { VagasService } from 'src/app/core/services/vagas.service';

@Component({
  selector: 'app-vagas',
  templateUrl: './vagas.component.html',
  styleUrls: ['./vagas.component.scss']
})
export class VagasComponent {

  linhaEmpresas: string[][] = []
  arrIds: number[] = []

  categorias: Categorias[] = []
  empresas: Empresa[] = []
  vaga: Vagas = new Vagas()

  modalVisualizar: boolean = false
  linhaVisualizar: string[] = []


  constructor(
    private vagasServ: VagasService,
    private empresaServ: EmpresasService,
    private categoriaServ: CategoriasService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    this.getEmpresa()
  }

  getDadosEmpresa(): void {
    this.vagasServ.getAll('').subscribe({
      next: (resp) => {
        this.linhaEmpresas = []
        this.arrIds = []
        for (let vagas of resp) {
          let linhaArr: string[] = []
          linhaArr.push(vagas.vaga)
          linhaArr.push(this.acharCateg(vagas.categoria))
          linhaArr.push(this.acharEmpresa(vagas.empresa))
          linhaArr.push(String(vagas.quantidade))
          this.linhaEmpresas.push(linhaArr)
          this.arrIds.push(vagas.id)
        }
      }
    })
  }

  getEmpresa(): void {
    this.empresaServ.getAll().subscribe({
      next: (resEmpresa) => {
        this.empresas = resEmpresa
        this.getCateg()
      }
    })
  }
  getCateg() {
    this.categoriaServ.getAll().subscribe({
      next: (resCateg) => {
        this.categorias = resCateg
        this.getDadosEmpresa()
      }
    })
  }

  deletarItem(event: number) {
    this.vagasServ.deleteId(event).subscribe((data) => {
      this.getEmpresa();
    })
  }

  visualizarItem(event: number) {
    this.linhaVisualizar = []
    this.vagasServ.getId(event).subscribe({
      next: res => {
        this.linhaVisualizar.push(String(res.id))
        this.linhaVisualizar.push(res.vaga)
        this.linhaVisualizar.push(String(res.empresa))
        this.linhaVisualizar.push(String(res.categoria))
        let salario = ['Min', res.salario.min, 'Max',res.salario.max]
 
        this.linhaVisualizar.push(this.funcSinaisArray(salario.toString()))
        this.linhaVisualizar.push(String(res.quantidade))
        let local = ['Cidade', res.local.cidade, 'Estado',res.local.estado]
        this.linhaVisualizar.push(this.funcSinaisArray(local.toString()))
        this.linhaVisualizar.push(String(res.publicacao))
        this.linhaVisualizar.push(res.descricao)
        let expedient = ['Dias', res.expediente.dias, 'inicio', res.expediente.inicio, 'fim', res.expediente.fim]
        this.linhaVisualizar.push(this.funcSinaisArray(expedient.toString()))
        this.linhaVisualizar.push(res.contratacao)
        this.linhaVisualizar.push(res.infosAdicionais)
        let arrayPerguntas = []
        for( let quest of res.questionario ) {
          let perguntas = ['Tipo pergunta', quest.tipoPergunta, 'pergunta', quest.pergunta]
          arrayPerguntas.push(this.funcSinaisArray(perguntas.toString()))
          for(let alternativa of quest.alternativas) {
            arrayPerguntas.push(alternativa)
          }
        }
        this.linhaVisualizar.push(arrayPerguntas.toString())
        
        this.abrirModalVisualizar()
      }
    })
  }

  funcSinaisArray(obj: string) {  
    let modificar = obj.split(',')
    let formattedResult = ''
    for (let i = 0; i < modificar.length; i++) {
      if (i % 2 === 0) {
        formattedResult += modificar[i];
        if (i !== modificar.length - 1) {
          formattedResult += ': ';
        }
      } else {
        formattedResult += modificar[i];
        if (i !== modificar.length - 1) {
          formattedResult += ', ';
        }
      }
    }
    return formattedResult
  }

  abrirModalVisualizar(){
    this.modalVisualizar = true
  }

  closeModalVisualizar(event: string) {
    if(event === 'close') {
      this.modalVisualizar = false
    } 
  }

  editarItem(event: number) {
    localStorage.removeItem('idDoItem')

    if (event) {
      this.router.navigate(['/cms/tabela/alterar/editar/vaga'])
      localStorage.setItem('idDoItem', JSON.stringify(event))
    }
  }


  acharCateg(id: number): string {
    let categ = this.categorias.filter((filtro: Categorias) => filtro.id == id)
    return categ[0].categoria
  }
  acharEmpresa(id: number): string {
    let empresa = this.empresas.filter((filtro: Empresa) => filtro.id == id)
    return empresa[0].nome
  }
}
