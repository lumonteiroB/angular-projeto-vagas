import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTS
import { MainComponent } from './main.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/core/login/login.component';
import { DescricaoComponent } from './pages/descricao/descricao.component';
import { InternaComponent } from './pages/interna/interna.component';
import { SignUpComponent } from './pages/core/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'interna',
        component: InternaComponent,
      },
      {
        path: 'detalhes',
        component: DescricaoComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
