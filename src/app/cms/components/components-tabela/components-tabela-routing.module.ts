import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmpresaComponent } from './empresa/empresa.component';
import { VagasComponent } from './vagas/vagas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { RespUsuariosComponent } from './resp-usuarios/resp-usuarios.component';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'empresa',
    component: EmpresaComponent
  },
  {
    path: 'usuario',
    component: UsuariosComponent
  },
  {
    path: 'vaga',
    component: VagasComponent
  },
  {
    path: 'categoria',
    component: CategoriasComponent
  },
  {
    path: 'resposta-questionario',
    component: RespUsuariosComponent
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
export class ComponentsTabelaRoutingModule { }
