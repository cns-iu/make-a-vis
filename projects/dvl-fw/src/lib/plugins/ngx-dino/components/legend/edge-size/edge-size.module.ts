// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendModule as NgxLegendModule } from '@ngx-dino/legend';

import { EdgeSizeComponent } from './edge-size.component';

@NgModule({
  imports: [CommonModule, NgxLegendModule],
  declarations: [EdgeSizeComponent],
  entryComponents: [EdgeSizeComponent]
})
export class EdgeSizeModule { }