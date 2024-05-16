import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ModalUtility } from 'src/app/core/models/modal-utility';

@Component({
  selector: 'app-modal-utility',
  templateUrl: './modal-utility.component.html',
  styleUrls: ['./modal-utility.component.scss']
})
export class ModalUtilityComponent implements OnInit {

  @Input() dados: ModalUtility[] = []

  @Output() onCloseOrLogin: EventEmitter<string> = new EventEmitter<string>()

  ngOnInit(
  ) {}

  constructor(
    public router: Router,
  ) { }

  closeOrLogin(text: string) {
    if (text) {
      this.onCloseOrLogin.emit(text)
    }
  }
}
