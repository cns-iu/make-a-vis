import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScatterplotModule } from './components/scatterplot/scatterplot.module';
import { GeomapModule } from './components/geomap/geomap.module';

@NgModule({
  imports: [CommonModule, ScatterplotModule, GeomapModule]
})
export class NgxDinoModule { }
