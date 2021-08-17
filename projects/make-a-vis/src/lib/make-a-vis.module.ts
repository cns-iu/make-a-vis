import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
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
import { TrackingState } from 'src/app/services/tracking-state';


@NgModule({
  imports: [
    CommonModule,
    DataViewModule, DragDropModule, LegendViewModule, MavSelectionModule, ToolbarModule, VisualizationViewModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
        strictStateSerializability: false,
        strictActionSerializability: false,
        strictActionWithinNgZone: false,
        strictActionTypeUniqueness: false,
      }
    }),
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
  constructor(loggingControl: LoggingControlService, logger: Logger, tracking: TrackingState) {
    // For unknown reasons logger is undefined in --prod mode! A temporary workaround has been implemented in log.ts
    // logger.setLevel(LogLevel.Trace);

    if (tracking.snapshot.allowTelemetry) {
      loggingControl.enableLogging();
    } else {
      loggingControl.disableLogging();
    }
  }
}
