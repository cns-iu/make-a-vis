import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScatterplotModule } from './components/scatterplot/scatterplot.module';
import { GeomapModule } from './components/geomap/geomap.module';
import { NetworkModule } from './components/network/network.module';

@NgModule({
  imports: [CommonModule, ScatterplotModule, GeomapModule, NetworkModule]
})
export class NgxDinoModule { }
