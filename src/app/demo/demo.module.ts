import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MakeAVisModule } from 'make-a-vis';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    MakeAVisModule
  ],
  declarations: [MainComponent],
  exports: [MainComponent]
})
export class DemoModule { }
