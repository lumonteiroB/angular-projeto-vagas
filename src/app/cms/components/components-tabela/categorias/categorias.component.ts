import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/core/models/categorias';
import { CategoriasService } from 'src/app/core/services/categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.scss']
})
export class CategoriasComponent {
  linhaCategorias: string[][] = []
  arrIds: number[] = []

  modalVisualizar: boolean = false
  linhaVisualizar: string[] = []
  
  categ: Categorias = new Categorias()

  constructor(
    private categoriaServ: CategoriasService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getDadosCateg()
  }

  getDadosCateg(): void {
    this.categoriaServ.getAll().subscribe({
      next: (resp) => {
        this.linhaCategorias = []
        this.arrIds = []
        for (let categ of resp) {
          let linhaArr: string[] = []
          linhaArr.push(categ.categoria)
          linhaArr.push(String(categ.icone))
          this.linhaCategorias.push(linhaArr)
          this.arrIds.push(categ.id)
        }
      }
    })
  }

  getCategId(id: number): void {
    
  }

  deletarItem(evento: number) {
    this.categoriaServ.deleteId(evento).subscribe((data) => {
      this.getDadosCateg();
    })
  }

  visualizarItem(event: number) {
    this.linhaVisualizar = []
    this.categoriaServ.getId(event).subscribe({
      next: res => {
        this.linhaVisualizar.push(String(res.id))
        this.linhaVisualizar.push(res.categoria)
        this.linhaVisualizar.push(res.icone)
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
      this.router.navigate(['/cms/tabela/alterar/editar/categoria'])
      localStorage.setItem('idDoItem', JSON.stringify(event))
    }
  }
}
