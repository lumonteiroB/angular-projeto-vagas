import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { LoginComponent } from './login.component';
import { ModalUtilityModule } from 'src/app/shared/modal-utility/modal-utility.module';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    ModalUtilityModule,
    LoginRoutingModule  
  ]
})
export class LoginModule { }


