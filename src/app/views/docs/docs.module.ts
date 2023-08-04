import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocsRoutingModule } from './docs-routing.module';
import { DocsHomeComponent } from './docs-home/docs-home.component';
import { DocsApikeysComponent } from './docs-apikeys/docs-apikeys.component';


@NgModule({
  declarations: [
    DocsHomeComponent,
    DocsApikeysComponent
  ],
  imports: [
    CommonModule,
    DocsRoutingModule
  ]
})
export class DocsModule { }
