import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [MainComponent],
  exports: [MainComponent]
})
export class LegendViewModule { }
