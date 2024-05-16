import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ComponentsTabelaRoutingModule } from './components-tabela-routing.module';
import { TabelaModule } from '../../shared/tabela/tabela.module';
import { VagasComponent } from './vagas/vagas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { EmpresaComponent } from './empresa/empresa.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalVisualizarModule } from '../../shared/modal-visualizar/modal-visualizar.module';
import { RespUsuariosComponent } from './resp-usuarios/resp-usuarios.component';

@NgModule({
  declarations: [
    VagasComponent,
    CategoriasComponent,
    EmpresaComponent,
    UsuariosComponent,
    RespUsuariosComponent,
    CategoriasComponent,
  ],
  imports: [
    CommonModule,
    ComponentsTabelaRoutingModule,
    TabelaModule,
    ModalVisualizarModule
  ]
})
export class ComponentsTabelaModule { }
