import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Logging
import { Logger } from './logging/logger';
import { LoggerFactory } from './logging/logger-factory';
import { NullLoggerFactory } from './logging/null-logging/logger-factory';

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
    LoggerFactory.use(NullLoggerFactory),
    // Copied from Logger.for because Angular's aot compiler is dumber than a log.
    {
      provide: Logger,
      useFactory(factory: LoggerFactory): Logger { return factory.createLogger('mav'); },
      deps: [LoggerFactory]
    }
  ]
})
export class MakeAVisModule { }
