// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColorModule } from './components/color/color.module';
import { EdgeSizeModule } from './components/edge-size/edge-size.module';
import { GeomapModule } from './components/geomap/geomap.module';
import { NetworkModule } from './components/network/network.module';
import { NodeSizeModule } from './components/node-size/node-size.module';
import { ScatterplotModule } from './components/scatterplot/scatterplot.module';
import { SciencemapModule } from './components/sciencemap/sciencemap.module';
import { TemporalBargraphModule } from './components/temporal-bargraph/temporal-bargraph.module';


@NgModule({
  imports: [
    CommonModule,
    ScatterplotModule, GeomapModule, NetworkModule,
    SciencemapModule, TemporalBargraphModule,
    NodeSizeModule, EdgeSizeModule, ColorModule
  ]
})
export class NgxDinoModule { }
