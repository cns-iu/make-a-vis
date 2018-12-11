import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';

import { MainComponent } from './main/main.component';
import { GraphicSymbolTypeComponent } from './graphic-symbol-type/graphic-symbol-type.component';
import { GraphicVariableTypeComponent } from './graphic-variable-type/graphic-variable-type.component';
import { VisualizationTypeComponent } from './visualization-type/visualization-type.component';

@NgModule({
  imports: [
    CommonModule,

    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatSidenavModule
  ],
  declarations: [MainComponent, GraphicSymbolTypeComponent, GraphicVariableTypeComponent, VisualizationTypeComponent],
  exports: [MainComponent]
})
export class MavSelectionModule { }
