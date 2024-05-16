import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalErroFormComponent } from './modal-erro-form.component';

@NgModule({
  declarations: [ModalErroFormComponent],
  imports: [
    CommonModule
  ],
  exports: [ ModalErroFormComponent]
})
export class ModalErroFormModule { }
