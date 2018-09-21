import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main/main.component';

// Icons
import { AddIconComponent } from './icons/add/add-icon.component';
import { CancelIconComponent } from './icons/cancel/cancel-icon.component';
import { HorizontalBarGraphIconComponent } from './icons/horizontal-bar-graph/horizontal-bar-graph-icon.component';
import { GeomapIconComponent } from './icons/geomap/geomap-icon.component';
import { MapOfScienceIconComponent } from './icons/map-of-science/map-of-science-icon.component';
import { NetworkIconComponent } from './icons/network/network-icon.component';
import { ScatterGraphIconComponent } from './icons/scatter-graph/scatter-graph-icon.component';

// Material
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

// Store
import { StoreModule } from '@ngrx/store';

// Reducers
import { visualizationStateReducer } from './shared/store/reducer';

@NgModule({
  imports: [
    CommonModule,

    MatChipsModule,
    MatMenuModule,
    MatTabsModule,

    StoreModule.forFeature('visualization', visualizationStateReducer)
  ],
  declarations: [
    MenuComponent,
    MainComponent,

    AddIconComponent,
    CancelIconComponent,
    HorizontalBarGraphIconComponent,
    GeomapIconComponent,
    MapOfScienceIconComponent,
    NetworkIconComponent,
    ScatterGraphIconComponent
  ],
  exports: [MainComponent]
})
export class VisualizationViewModule { }
