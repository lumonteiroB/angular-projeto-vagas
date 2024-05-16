import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalUtility } from 'src/app/core/models/modal-utility';

@Component({
  selector: 'app-modal-erro-form',
  templateUrl: './modal-erro-form.component.html',
  styleUrls: ['./modal-erro-form.component.scss']
})
export class ModalErroFormComponent {

  @Input() dados: ModalUtility[] = []

  @Output() onClose: EventEmitter<string> = new EventEmitter<string>()

  closeModal() {
    this.onClose.emit('close')    
  }
}
