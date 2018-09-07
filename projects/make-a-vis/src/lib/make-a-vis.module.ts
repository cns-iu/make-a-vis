import { NgModule, Optional, Self, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Logger, LoggerConfig, LoggerFactory, TypescriptLoggerFactory } from '@ngx-dino/core';

// Submodules
import { DataViewModule } from './data-view/data-view.module';
import { LegendViewModule } from './legend-view/legend-view.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { VisualizationViewModule } from './visualization-view/visualization-view.module';

// Themes
import { LightThemeComponent } from './light-theme/light-theme.component';

// Main component
import { MakeAVisComponent } from './make-a-vis.component';

@NgModule({
  imports: [
    CommonModule,
    DataViewModule, LegendViewModule, ToolbarModule, VisualizationViewModule
  ],
  declarations: [LightThemeComponent, MakeAVisComponent],
  exports: [MakeAVisComponent, ToolbarModule],
  providers: [
    { provide: LoggerFactory, useExisting: TypescriptLoggerFactory },
    { provide: LoggerConfig, useValue: { name: 'make-a-vis' } },
    {
      provide: Logger, useFactory(factory, parent, config) { return factory.createLogger(parent, config); },
      deps: [LoggerFactory, [new Optional(), new SkipSelf(), Logger], [new Self(), LoggerConfig]]
    }
  ]
})
export class MakeAVisModule { }
