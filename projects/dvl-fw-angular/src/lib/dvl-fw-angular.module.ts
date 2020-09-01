import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ItemComponent } from './legend/item/item.component';
import { LegendComponent } from './legend/legend.component';
import { DvlFwVisualizationComponent } from './visualization/visualization.component';


@NgModule({
  declarations: [LegendComponent, ItemComponent, DvlFwVisualizationComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MatCardModule, MatSelectModule],
  exports: [LegendComponent, ItemComponent, DvlFwVisualizationComponent]
})
export class DvlFwAngularModule {}
