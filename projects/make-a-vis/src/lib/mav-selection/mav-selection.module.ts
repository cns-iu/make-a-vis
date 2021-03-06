import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DvlFwAngularModule } from '@dvl-fw/angular';
import { StoreModule } from '@ngrx/store';

import { DragDropModule } from '../drag-drop/drag-drop.module';
import { GraphicSymbolTypeComponent } from './graphic-symbol-type/graphic-symbol-type.component';
import { GraphicVariableIconComponent } from './graphic-variable-icon/graphic-variable-icon.component';
import { GraphicVariableTypeComponent } from './graphic-variable-type/graphic-variable-type.component';
import { MainComponent } from './main/main.component';
import { mavSelectionStateReducer } from './shared/store';
import { GeomapIconComponent } from './visualization-type/icons/geomap-icon/geomap-icon.component';
import { NetworkIconComponent } from './visualization-type/icons/network-icon/network-icon.component';
import { ScatterGraphIconComponent } from './visualization-type/icons/scatter-graph-icon/scatter-graph-icon.component';
import { ScienceMapIconComponent } from './visualization-type/icons/science-map-icon/science-map-icon.component';
import {
  TemporalBargraphIconComponent,
} from './visualization-type/icons/temporal-bargraph-icon/temporal-bargraph-icon.component';
import { VisualizationTypeComponent } from './visualization-type/visualization-type.component';

// Needed for angulars broken aot compiler
export function reduceWrapper(state: any, action: any): any { return mavSelectionStateReducer(state, action); }

@NgModule({
  imports: [
    CommonModule,
    DragDropModule,
    DvlFwAngularModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatSidenavModule,
    StoreModule.forFeature('mavSelection', reduceWrapper)
  ],
  declarations: [
    MainComponent, GraphicSymbolTypeComponent, GraphicVariableTypeComponent, VisualizationTypeComponent,
    ScatterGraphIconComponent, GeomapIconComponent, ScienceMapIconComponent, NetworkIconComponent,
    TemporalBargraphIconComponent, GraphicVariableIconComponent
  ],
  exports: [MainComponent]
})
export class MavSelectionModule { }
