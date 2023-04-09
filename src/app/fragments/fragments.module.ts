import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FragmentsRoutingModule } from './fragments-routing.module';
import { SlideComponent } from './slide/slide.component';


@NgModule({
  declarations: [SlideComponent],
  imports: [
    CommonModule,
    FragmentsRoutingModule
  ]
})
export class FragmentsModule { }
