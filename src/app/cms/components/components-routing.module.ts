import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tabela',
    loadChildren: () => import('./components-tabela/components-tabela.module').then((m) => m.ComponentsTabelaModule)
  },
  {
    path: 'alterar/:var',
    loadChildren: () => import('./components-inputs/components-inputs.module').then((m) => m.ComponentsInputsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
