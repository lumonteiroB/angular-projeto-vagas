import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { PagesRoutingModule } from './main-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './shared/footer/footer.component';
import { MainComponent } from './main.component';

import { RouterLink } from '@angular/router';
import { ModalUtilityModule } from '../shared/modal-utility/modal-utility.module';
import { DescricaoComponent } from './pages/descricao/descricao.component';
import { HomeComponent } from './pages/home/home.component';
import { InternaComponent } from './pages/interna/interna.component';
import { LoginComponent } from './pages/core/login/login.component';
import { SignUpComponent } from './pages/core/sign-up/sign-up.component';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    MainComponent,
    FooterComponent,
    DescricaoComponent,
    HomeComponent,
    InternaComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
    ModalUtilityModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'pt' }
  ],
  exports: []
})
export class PagesModule { }
