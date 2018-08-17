import { NgModule, FactoryProvider } from '@angular/core';

// Logging
import { Logger } from './logging/logger';
import { LoggerFactory } from './logging/logger-factory';
import { NullLoggerFactory } from './logging/null-logging/logger-factory';

// Submodules
import { DataViewModule } from './data-view/data-view.module';
import { LegendViewModule } from './legend-view/legend-view.module';
import { ToolbarModule } from './toolbar/toolbar.module';
import { VisualizationViewModule } from './visualization-view/visualization-view.module';

import { MakeAVisComponent } from './make-a-vis.component';

@NgModule({
  imports: [DataViewModule, LegendViewModule, ToolbarModule, VisualizationViewModule],
  declarations: [MakeAVisComponent],
  exports: [MakeAVisComponent],
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
