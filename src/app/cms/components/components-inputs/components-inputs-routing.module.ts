import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaInputsComponent } from './empresa-inputs/empresa-inputs.component';
import { VagasInputsComponent } from './vagas-inputs/vagas-inputs.component';
import { CategoriaInputsComponent } from './categoria-inputs/categoria-inputs.component';
import { UsuarioInputsComponent } from './usuario-inputs/usuario-inputs.component';

const routes: Routes = [
  {
    path: 'empresa',
    component: EmpresaInputsComponent
  },
  {
    path: 'vaga',
    component: VagasInputsComponent
  },
  {
    path: 'categoria',
    component: CategoriaInputsComponent
  },
  {
    path: 'usuario',
    component: UsuarioInputsComponent
  },
  {
    path: '',
    redirectTo: 'empresa',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsInputsRoutingModule { }
