import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmGuard } from './core/guard/adm.guard';

const routes: Routes = [

  {
    path: 'login',
    loadChildren: () => import('./core/login/login.module').then((m) => m.LoginModule)
  },
  {
    path: '',
    redirectTo: 'tabela',
    pathMatch: 'full'
  },
  {
    path: 'tabela',
    canActivateChild: [AdmGuard],
    loadChildren: () => import('./components/components.module').then((m) => m.ComponentsModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmsRoutingModule { }
