import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScatterplotModule } from './components/scatterplot/scatterplot.module';
import { GeomapComponent } from './components/geomap/geomap.component';

@NgModule({
  imports: [CommonModule, ScatterplotModule],
  declarations: [GeomapComponent]
})
export class NgxDinoModule { }
