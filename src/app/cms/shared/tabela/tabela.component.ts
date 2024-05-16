import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Empresa } from 'src/app/core/models/empresa';
import { ModalUtility } from 'src/app/core/models/modal-utility';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.scss']
})
export class TabelaComponent {

  @Input() colunasTabela: string[] = []
  @Input() linhasTabela: string[][] = []
  @Input() temDelete: number[] = [];

  @Output() onDelete = new EventEmitter<number>();
  @Output() onVisualizar = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<number>();

  perguntaUsuario: ModalUtility [] = []
  pergunta: boolean = false
  idClicado: number = 0

  ngOnInit() {
  }

  constructor(
    public router: Router
  ) {

  }

  dinamicQuestUser(id: number) {
    this.idClicado = id 
    this.pergunta = true
    this.perguntaUsuario = [
      {
        nome: 'Deseja mesmo excluir este item? ',
        tipo: 'title'
      },
      {
        nome: 'Esta ação não poderá ser revertida',
        tipo: 'subtitle'
      },
      {
        nome: 'Cancelar',
        tipo: 'button'
      },
      {
        nome: 'Excluir',
        tipo: 'button'
      }
    ]
  }
  
  clickDelete( event: string, ind: number ): void{
    if( event ) {
      if(event === 'Cancelar'){
        this.pergunta = false
      }
      if(event === 'Excluir'){
        this.onDelete.emit(this.temDelete[ind]);
        this.pergunta = false
      }
    }
  }

  clickVisualizar(id: number): void {
    this.onVisualizar.emit(this.temDelete[id])
  }

  clickEditar(id: number): void {
    this.onEdit.emit(this.temDelete[id])
  }
}
