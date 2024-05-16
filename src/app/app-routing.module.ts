import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './cms/core/login/login.component';

const routes: Routes = [
  {
    path:'', 
    loadChildren: () => import('./components/main.module').then(p => p.PagesModule)
  },
  {
    path: 'cms',
    loadChildren: () => import('./cms/cms.module').then(c => c.CmsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
