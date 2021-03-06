// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { mapValues, uniqueId } from 'lodash';

import { GraphicSymbol, GraphicVariable, RecordStream, Visualization } from '@dvl-fw/core';
import { SetGraphicVariable, SetRecordStream, UnsetGraphicVariable, UnsetRecordStream } from '../../../toolbar/shared/store';
import { ApplicationState } from '../../store';

class SimpleGraphicSymbol implements GraphicSymbol {
  constructor(
    public id: string, public type: string, public recordStream: RecordStream,
    public graphicVariables: { [id: string]: GraphicVariable } = { }
  ) { }

  toJSON(): any {
    const graphicVariables = mapValues(this.graphicVariables, (gvar) => ({
      recordSet: gvar.recordSet.id,
      dataVariable: gvar.dataVariable.id,
      graphicVariableType: gvar.type,
      graphicVariableId: gvar.id
    }));

    return {
      id: this.id,
      type: this.type,
      recordStream: this.recordStream.id,
      graphicVariables
    };
  }
}

@Injectable({
  providedIn: 'root'
})
export class UpdateVisService {
  readonly update: Observable<Visualization>;
  private _update = new Subject<Visualization>();

  constructor(private store: Store<ApplicationState>) {
    this.update = this._update.asObservable();
  }

  updateGraphicSymbol(visualization: Visualization, slot: string, type: string, stream?: RecordStream): void {
    const symbol = stream ? new SimpleGraphicSymbol(`${slot}-${uniqueId()}`, type, stream) : undefined;
    this.store.dispatch(new SetRecordStream({ slot, symbol, visualization }));
    this._update.next(visualization);
  }

  updateGraphicVariable(visualization: Visualization, slot: string, id: string, variable: GraphicVariable): void {
    this.store.dispatch(new SetGraphicVariable({ id, slot, variable, visualization }));
    this._update.next(visualization);
  }

  unsetGraphicVariable(visualization: Visualization, slot: string, id: string): void {
    this.store.dispatch(new UnsetGraphicVariable({ id, slot, visualization }));
    this._update.next(visualization);
  }

  unsetRecordStream(slot: string, visualization: Visualization) {
    this.store.dispatch(new UnsetRecordStream({slot, visualization}));
    this._update.next(visualization);
  }
}
