import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Store
import { StoreModule } from '@ngrx/store';

// Submodules
import { DataViewModule } from './data-view/data-view.module';
import { LegendViewModule } from './legend-view/legend-view.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { VisualizationViewModule } from './visualization-view/visualization-view.module';

// Themes
import { LightThemeComponent } from './light-theme/light-theme.component';

// Main component
import { MakeAVisComponent } from './make-a-vis.component';

// Reducers
import { reducers } from './shared/store/reducer';

@NgModule({
  imports: [
    CommonModule,
    DataViewModule, LegendViewModule, ToolbarModule, VisualizationViewModule,
    StoreModule.forRoot(reducers),
  ],
  declarations: [LightThemeComponent, MakeAVisComponent],
  exports: [MakeAVisComponent, ToolbarModule],
  providers: []
})
export class MakeAVisModule { }
