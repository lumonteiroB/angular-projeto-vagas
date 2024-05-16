import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsRoutingModule } from './components-routing.module';
import { ComponentsTabelaModule } from './components-tabela/components-tabela.module';
import { ComponentsInputsModule } from './components-inputs/components-inputs.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ComponentsRoutingModule,
    ComponentsTabelaModule,
    ComponentsInputsModule
  ]
})
export class ComponentsModule { }
