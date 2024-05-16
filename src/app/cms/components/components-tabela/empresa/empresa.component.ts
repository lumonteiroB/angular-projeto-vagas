import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmpresasService } from 'src/app/core/services/empresas.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss']
})
export class EmpresaComponent {
  
  linhaEmpresas: string [][] = []
  arrIds: number[] = []

  modalVisualizar: boolean = false

  linhaVisualizar: string[] = []

  constructor(
    private empresaServ: EmpresasService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getDadosEmpresa()
  }

  getDadosEmpresa(): void {
    this.empresaServ.getAll().subscribe({
      next: (resp) => {
        this.linhaEmpresas = []
        this.arrIds = []
        for(let empresa of resp){
          let linhaArr: string[] = []
          linhaArr.push(empresa.nome)
          linhaArr.push(String(empresa.logo))
          this.linhaEmpresas.push(linhaArr) 
          this.arrIds.push(empresa.id)
        }
      }
    })
  }

  deletarItem(event: number) {
    this.empresaServ.deleteId(event).subscribe((data) => {
      this.getDadosEmpresa();
    })
  }

  visualizarItem(event: number) {
    this.linhaVisualizar = []
    this.empresaServ.getId(event).subscribe({
      next: res => {
        this.linhaVisualizar.push(String(res.id))
        this.linhaVisualizar.push(res.nome)
        this.linhaVisualizar.push(res.logo)
        this.abrirModalVisualizar()
      }
    })
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
    
    if(event) {
      this.router.navigate(['/cms/tabela/alterar/editar/empresa'])
      localStorage.setItem('idDoItem', JSON.stringify(event))
    }
  }
}
