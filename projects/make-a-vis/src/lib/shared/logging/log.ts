import { Logger, MessageType, LogData } from '@ngx-dino/core';
import { Actions, Effect , ofType } from '@ngrx/effects';
import { SidenavActionTypes, LoadProjectCompleted } from '../../toolbar/shared/store';
import { catchError, map , exhaustMap, tap } from 'rxjs/operators';
import { Action } from '@ngrx/store';
import { pick, values } from 'lodash';
import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class LogActions {

messageType: MessageType;
logData: LogData;
startingActions: any = values(pick(SidenavActionTypes, [
  'SaveProjectStarted',
  'LoadProjectStarted',
  'ExportSnapshotStarted',
  'LoadShareUrlStarted',
  'CreateShareUrlStarted'
]));

constructor(private actions$: Actions, private logger: Logger) {
 }

@Effect({ dispatch: false })
  startActions: Observable<Action> = this.actions$.pipe(
    ofType(...this.startingActions),
    tap(payloadAndType => {
      console.log('in effects');
      this.logData = {
        msg : 'saving log activity',
        data: payloadAndType
      };
      console.log('called logger');
      console.log(this.logData);
      this.logger.info(this.logData);
    })
  );
}
