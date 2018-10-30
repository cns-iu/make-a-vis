// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemporalBargraphComponent } from './temporal-bargraph.component';

@NgModule({
  imports: [CommonModule],
  declarations: [TemporalBargraphComponent],
  entryComponents: [TemporalBargraphComponent]
})
export class TemporalBargraphModule { }
