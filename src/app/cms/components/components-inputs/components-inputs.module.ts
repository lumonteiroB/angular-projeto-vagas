import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsInputsRoutingModule } from './components-inputs-routing.module';
import { CategoriaInputsComponent } from './categoria-inputs/categoria-inputs.component';
import { EmpresaInputsComponent } from './empresa-inputs/empresa-inputs.component';
import { VagasInputsComponent } from './vagas-inputs/vagas-inputs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalUtilityModule } from 'src/app/shared/modal-utility/modal-utility.module';
import { UsuarioInputsComponent } from './usuario-inputs/usuario-inputs.component';
import { ModalErroFormModule } from '../../shared/modal-erro-form/modal-erro-form.module';


@NgModule({
  declarations: [
    CategoriaInputsComponent,
    EmpresaInputsComponent,
    VagasInputsComponent,
    UsuarioInputsComponent,
  ],
  imports: [
    CommonModule,
    ComponentsInputsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ModalUtilityModule,
    ModalErroFormModule
  ]
})
export class ComponentsInputsModule { }
