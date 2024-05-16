import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-visualizar',
  templateUrl: './modal-visualizar.component.html',
  styleUrls: ['./modal-visualizar.component.scss']
})
export class ModalVisualizarComponent implements OnInit{
  @Input() dados: string[] = []
  @Input() titles: string[] = []

  @Output() onCloseOrLogin: EventEmitter<string> = new EventEmitter<string>()

  ngOnInit(): void {
    
  }

  closeModal() {        
      this.onCloseOrLogin.emit('close')
  }
}
