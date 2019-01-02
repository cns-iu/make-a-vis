import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DragDropModule } from '../drag-drop/drag-drop.module';
import { MainComponent } from './main/main.component';
import { GraphicSymbolTypeComponent } from './graphic-symbol-type/graphic-symbol-type.component';
import { GraphicVariableTypeComponent } from './graphic-variable-type/graphic-variable-type.component';
import { VisualizationTypeComponent } from './visualization-type/visualization-type.component';
import { ScatterGraphIconComponent } from './visualization-type/icons/scatter-graph-icon/scatter-graph-icon.component';
import { StaticLegendModule, DvlFwModule } from '@dvl-fw/core';
import { GeomapIconComponent } from './visualization-type/icons/geomap-icon/geomap-icon.component';
import { ScienceMapIconComponent } from './visualization-type/icons/science-map-icon/science-map-icon.component';
import { NetworkIconComponent } from './visualization-type/icons/network-icon/network-icon.component';
import { TemporalBargraphIconComponent } from './visualization-type/icons/temporal-bargraph-icon/temporal-bargraph-icon.component';
import { GraphicVariableIconComponent } from './graphic-variable-icon/graphic-variable-icon.component';

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    DvlFwModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule,
    StaticLegendModule
  ],
  declarations: [
    MainComponent, GraphicSymbolTypeComponent, GraphicVariableTypeComponent, VisualizationTypeComponent,
    ScatterGraphIconComponent, GeomapIconComponent, ScienceMapIconComponent, NetworkIconComponent,
    TemporalBargraphIconComponent, GraphicVariableIconComponent
  ],
  exports: [MainComponent]
})
export class MavSelectionModule { }
