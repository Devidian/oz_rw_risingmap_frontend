import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttperrRoutingModule } from './httperr-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [
    CommonModule,
    HttperrRoutingModule
  ]
})
export class HttperrModule { }
