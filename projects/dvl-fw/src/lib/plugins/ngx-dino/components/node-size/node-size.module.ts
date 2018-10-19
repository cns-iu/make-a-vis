import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendModule as NgxLegendModule } from '@ngx-dino/legend';
import { NodeSizeComponent } from './node-size.component';

@NgModule({
  imports: [CommonModule, NgxLegendModule],
  declarations: [NodeSizeComponent],
  entryComponents: [NodeSizeComponent]
})
export class NodeSizeModule { }
