import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { GeomapModule } from './components/geomap/geomap.module';
import { ColorModule } from './components/legend/color/color.module';
import { EdgeSizeModule } from './components/legend/edge-size/edge-size.module';
import { NodeSizeModule } from './components/legend/node-size/node-size.module';
import { StaticLegendModule } from './components/legend/static-legend.module';
import { NetworkModule } from './components/network/network.module';
import { ScatterplotModule } from './components/scatterplot/scatterplot.module';
import { SciencemapModule } from './components/sciencemap/sciencemap.module';
import { TemporalBargraphModule } from './components/temporal-bargraph/temporal-bargraph.module';


@NgModule({
  imports: [
    CommonModule, StaticLegendModule,
    ScatterplotModule, GeomapModule, NetworkModule,
    SciencemapModule, TemporalBargraphModule,
    NodeSizeModule, EdgeSizeModule, ColorModule
  ]
})
export class NgxDinoModule { }
