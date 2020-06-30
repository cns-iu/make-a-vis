import { Injectable } from '@angular/core';
import {
  BoundField,
  chain,
  ChangeSet,
  DataProcessor,
  DataProcessorService,
  Datum,
  map,
  RawChangeSet,
  simpleField,
} from '@ngx-dino/core';
import { Map } from 'immutable';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { Subdiscipline } from './subdiscipline';
import underlyingScimapData from './underlyingScimapData.json';

export function validField(field: BoundField<any>): BoundField<any> {
  if (field) {
    const wrapped = field.operator.wrapped;
    // Test for !ConstantOperator(undefined | null)
    if (!('value' in wrapped) || wrapped['value'] != null) {
      return field;
    }
  }
  return undefined;
}

@Injectable({
  providedIn: 'root'
})
export class ScienceMapDataService {
  public subdisciplineProcessor: DataProcessor<any, Subdiscipline & Datum<any>>;
  private subdisciplineChange = new BehaviorSubject<ChangeSet<Subdiscipline>>(new ChangeSet<Subdiscipline>());
  subdisciplines: Observable<ChangeSet<Subdiscipline>> = this.subdisciplineChange.asObservable();

  private streamSubscription: Subscription;

  underlyingScimapData: any;
  subdIdToPosition: any;
  subdIdToDisc: any;
  subdIdToName: any;
  discIdToColor: any;

  constructor(private processorService: DataProcessorService) {
    this.underlyingScimapData = underlyingScimapData;
    this.makeMappings();
  }

  makeMappings() {
    this.subdIdToPosition = underlyingScimapData.nodes.reduce((obj, n) => {
      obj[n.subd_id] = {x: n.x, y: n.y};
      return obj;
    }, {});

    this.subdIdToDisc = underlyingScimapData.nodes.reduce((obj, n) => {
      obj[n.subd_id] = {disc_id: n.disc_id};
      return obj;
    }, {});

    this.subdIdToName = underlyingScimapData.nodes.reduce((obj, n) => {
      obj[n.subd_id] = {subd_name: n.subd_name};
      return obj;
    }, {});

    this.discIdToColor = underlyingScimapData.disciplines.reduce((obj, d) => {
      obj[d.disc_id] = d.color;
      return obj;
    }, {});
  }

  fetchData(
    stream: Observable<RawChangeSet<any>>,
    subdisciplineIdField: BoundField<number | string>,
    subdisciplineSizeField: BoundField<number | string>,
    tooltipTextField?: BoundField<number | string>
  ): this {
    const fields = this.getFields(subdisciplineIdField, subdisciplineSizeField, tooltipTextField);
    this.subdisciplineProcessor = this.processorService.createProcessor<Subdiscipline & Datum<any>, any>(
      stream,
      subdisciplineIdField,
      fields.toJS()
    );

    if (this.streamSubscription) {
      this.streamSubscription.unsubscribe();
    }

    this.streamSubscription = this.subdisciplineProcessor.asObservable().subscribe(
      (change) => this.subdisciplineChange.next(change)
    );

    return this;
  }

  updateData(
    subdisciplineIdField: BoundField<number | string>,
    subdisciplineSizeField: BoundField<number | string>,
    tooltipTextField?: BoundField<number | string>
  ) {
    const fields = this.getFields(subdisciplineIdField, subdisciplineSizeField, tooltipTextField);
    this.subdisciplineProcessor.updateFields(fields.toKeyedSeq());
  }

  private getFields(
    subdisciplineIdField: BoundField<number | string>,
    subdisciplineSizeField: BoundField<number | string>,
    tooltipTextField?: BoundField<number | string>
  ): Map<any, any> {
    const fields = {
      size: validField(subdisciplineSizeField),
      tooltipText: validField(tooltipTextField),
      subdisciplineName: simpleField({
        bfieldId: 'subd_name', label: 'Subdiscipline name',
        operator: chain(subdisciplineIdField.operator, map(id => {
          const item = this.subdIdToName[id];
          return item && item.subd_name;
        }))
      }).getBoundField()
    };
    Object.keys(fields).forEach(key => fields[key] === undefined && delete fields[key]);
    return Map<string, BoundField<any>>(fields);
  }
}
