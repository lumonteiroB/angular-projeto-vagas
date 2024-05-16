import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CmsRoutingModule } from './cms-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [  ],
  imports: [
    CommonModule,
    CmsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink,
  ]
})
export class CmsModule { }
