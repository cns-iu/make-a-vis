import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProjectSerializer } from '@dvl-fw/core';
import { NgxDinoPlugin } from '@dvl-fw/ngx-dino';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { Logger } from '@ngx-dino/core';

import { DataViewModule } from './data-view/data-view.module';
import { DragDropModule } from './drag-drop/drag-drop.module';
import { LegendViewModule } from './legend-view/legend-view.module';
import { LightThemeComponent } from './light-theme/light-theme.component';
import { MakeAVisComponent } from './make-a-vis.component';
import { MavSelectionModule } from './mav-selection/mav-selection.module';
import { LogActions } from './shared/logging/log';
import { LoggingControlService } from './shared/logging/logging-control.service';
import { reducers } from './shared/store/reducer';
import { ToolbarModule } from './toolbar/toolbar.module';
import { VisualizationViewModule } from './visualization-view/visualization-view.module';

@NgModule({
  imports: [
    CommonModule,
    DataViewModule, DragDropModule, LegendViewModule, MavSelectionModule, ToolbarModule, VisualizationViewModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([LogActions])
  ],
  declarations: [LightThemeComponent, MakeAVisComponent],
  exports: [MakeAVisComponent, ToolbarModule],
  // providers: [
  //   { provide: LoggerFactory, useExisting: TypescriptLoggerFactory },
  //   { provide: LoggerConfig, useValue: { name: 'make-a-vis' } },
  //   {
  //     provide: Logger, useFactory(factory, parent, config) { return factory.createLogger(parent, config); },
  //     deps: [LoggerFactory, [new Optional(), new SkipSelf(), Logger], [new Self(), LoggerConfig]]
  //   }
  // ]
})
export class MakeAVisModule {
  constructor(loggingControl: LoggingControlService, logger: Logger) {
    // For unknown reasons logger is undefined in --prod mode! A temporary workaround has been implemented in log.ts
    // logger.setLevel(LogLevel.Trace);

    // Register plugins - This should really be done through injection but that part hasn't been figured out yet
    ProjectSerializer.defaultRegistry.registerPlugin(new  NgxDinoPlugin());
  }
}
