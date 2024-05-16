import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalVisualizarComponent } from './modal-visualizar.component';



@NgModule({
  declarations: [ModalVisualizarComponent],
  imports: [
    CommonModule
  ],
  exports: [ ModalVisualizarComponent]
})
export class ModalVisualizarModule { }
