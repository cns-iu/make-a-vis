import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScatterplotModule as NgxScatterplotModule } from '@ngx-dino/scatterplot';
import { ScatterplotComponent } from './scatterplot.component';

@NgModule({
  imports: [CommonModule, NgxScatterplotModule],
  declarations: [ScatterplotComponent],
  entryComponents: [ScatterplotComponent]
})
export class ScatterplotModule { }
