import { Logger, MessageType, LogData, ErrorType, TypescriptLoggerFactory, LogLevel } from '@ngx-dino/core';
import { Actions, Effect , ofType } from '@ngrx/effects';
import { SidenavActionTypes, LoadProjectCompleted } from '../../toolbar/shared/store';
import { catchError, map , exhaustMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { pick, values } from 'lodash';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LogActions {
  private logger: Logger;

  messageType: MessageType;
  logData: LogData;
  errorType: ErrorType;
  startingActions: any = values(pick(SidenavActionTypes, [
    'SaveProjectStarted',
    'SaveProjectCompleted',

    'LoadProjectStarted',
    'LoadProjectCompleted',

    'ExportSnapshotStarted',
    'ExportSnapshotCompleted',

    'LoadShareUrlStarted',

    'CreateShareUrlCompleted',
    'CopyToClipboardSuccess',
    'LoadShareUrlCompletedPayload',

    'SetRecordStream',
    'AddNewVisualization',
    'RemoveVisualization',
    'SetActiveVisualization'
  ]));


  errorActions: any = values(pick(SidenavActionTypes, [
    'LoadProjectError',
    'ExportSnapshotError',
    'LoadShareUrlError',
    'CreateShareUrlError',
  ]));

  constructor(private actions$: Actions, loggerFactory: TypescriptLoggerFactory) {
    this.logger = loggerFactory.createLogger(undefined, { name: 'make-a-vis' }); // Workaround for #94
    this.logger.setLevel(LogLevel.Trace);
  }

  @Effect({ dispatch: false })
  startActionsEffects: Observable<Action> = this.actions$.pipe(
    ofType(...this.startingActions),
    tap(payloadAndType => {
      this.logData = {
        msg : 'action successful',
        data: payloadAndType
      };
      if (this.logger && this.logger.info) {
        this.logger.info(this.logData);
      }
    })
  );

  errorActionsEfects: Observable<Action> = this.actions$.pipe(
    ofType(...this.errorActions),
    tap(errorPayload => {
      this.logData = {
        msg : 'action failed',
        data: errorPayload
      };
      this.logger.info(this.logData);
    })
  );
}
