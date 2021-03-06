import { Injectable, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { OnGraphicSymbolChange, OnPropertyChange } from '@dvl-fw/angular';
import { GraphicVariable, Visualization, VisualizationComponent } from '@dvl-fw/core';
import { BoundField, RawChangeSet } from '@ngx-dino/core';
import { at, clone, forOwn, identity, mapValues, pick } from 'lodash';
import { EMPTY as emptyStream, Observable } from 'rxjs';


export interface SimpleProperties {
  [prop: string]: any;
}
export interface SimpleFieldGroup {
  [field: string]: BoundField<any>;
}
export interface SimpleFieldGroups {
  [group: string]: SimpleFieldGroup;
}

// tslint:disable:no-bitwise
export const enum Selector {
  Stream = 1 << 0,
  Properties = 1 << 1,
  Fields =  1 << 2,
  None = 0,
  All = Stream | Properties | Fields
}
// tslint:enable:no-bitwise

const hasOwnProperty = ({}).hasOwnProperty;

@Injectable()
export abstract class BaseVisualizationComponent<P extends SimpleProperties, F extends SimpleFieldGroups>
implements VisualizationComponent, OnInit, OnChanges, OnPropertyChange, OnGraphicSymbolChange {
  @Input() data: Visualization;
  streams: { [G in keyof F]: Observable<RawChangeSet> } = {} as any;
  properties: P = {} as any;
  fieldGroups: F = {} as any;

  abstract readonly defaultProperties: P;
  abstract readonly defaultFieldGroups: F;
  abstract fieldNameFor(key: string, group: string): string;

  ngOnInit(): void {
    if (this.defaultFieldGroups) {
      this.reset(Object.keys(this.defaultFieldGroups));
    }
    this.ngOnChanges({ data: { currentValue: this.data } as SimpleChange});
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      const newData: Visualization = changes['data'].currentValue;

      this.reset();
      if (newData) {
        const propChanges = {};
        forOwn(newData.properties, (value, key) => propChanges[key] = { currentValue: value });
        this.dvlOnPropertyChange(propChanges);

        const symbolChanges = {};
        forOwn(newData.graphicSymbols, (value, key) => symbolChanges[key] = { currentValue: value });
        this.dvlOnGraphicSymbolChange(symbolChanges);
      }
    }
  }

  dvlOnPropertyChange(changes: SimpleChanges): void {
    const newProperties = clone(this.properties);
    const changedValues = mapValues(changes, 'currentValue');
    const changed = this.applyChanges(changedValues, newProperties, this.defaultProperties);
    if (changed) {
      this.properties = newProperties;
    }
  }

  dvlOnGraphicSymbolChange(changes: SimpleChanges): void {
    const newStreams = this.getStreams(true);
    const newFields = this.getFieldGroups(true);
    let streamsChanged = false;
    let fieldsChanged = false;

    forOwn(changes, (change, key) => {
      if (hasOwnProperty.call(this.fieldGroups, key)) {
        const [currentValue, currentStream, graphicVariables] = at(change, [
          'currentValue', 'currentValue.recordStream', 'currentValue.graphicVariables'
        ]);
        const [previousValue, previousStream] = at(change, [
          'previousValue', 'previousValue.recordStream'
        ]);

        if (!currentValue) {
          this.reset([key], Selector.Stream | Selector.Fields); // tslint:disable-line:no-bitwise
        }

        const changed = this.applyChanges<GraphicVariable, BoundField<any>>(
          graphicVariables, newFields[key], this.defaultFieldGroups[key],
          k => this.fieldNameFor(k, key), v => v.asBoundField(), (v1, v2) =>  v1 && v2 && v1.equals(v2)
        );

        if (currentValue && (!previousValue || currentStream !== previousStream || changed)) {
          newStreams[key as keyof F] = currentStream ? currentStream.asObservable() : emptyStream;
          streamsChanged = true;
        }

        fieldsChanged = fieldsChanged || changed;
      }
    });

    if (streamsChanged) {
      this.streams = newStreams;
    }
    if (fieldsChanged) {
      this.fieldGroups = newFields;
    }
  }

  reset(groups: (keyof F)[] = Object.keys(this.streams), selector: Selector = Selector.All): void {
    if ((selector & Selector.Stream) !== 0) { // tslint:disable-line:no-bitwise
      const emptyStreams = groups.reduce((streams, key) => {
        streams[key] = emptyStream;
        return streams;
      }, {} as any);
      const newStreams = this.getStreams(true);
      Object.assign(newStreams, emptyStreams);
      this.streams = newStreams;
    }

    if ((selector & Selector.Properties) !== 0) { // tslint:disable-line:no-bitwise
      this.properties = this.getProperties(true, this.defaultProperties);
    }

    if ((selector & Selector.Fields) !== 0) { // tslint:disable-line:no-bitwise
      const selectedFields = pick(this.getFieldGroups(true, this.defaultFieldGroups), groups);
      const newFields = this.getFieldGroups(true);
      Object.assign(newFields, selectedFields);
      this.fieldGroups = newFields;
    }
  }

  private getStreams(shouldClone: boolean = false, streams = this.streams): { [G in keyof F]: Observable<RawChangeSet> } {
    return shouldClone ? clone(streams) : streams;
  }

  private getProperties(shouldClone: boolean = false, properties = this.properties): P {
    return shouldClone ? clone(properties) : properties;
  }

  private getFieldGroups(shouldClone: boolean = false, groups = this.fieldGroups): F {
    return shouldClone ? mapValues(groups, g => clone(g)) as any : groups;
  }

  private applyChanges<T1, T2>(
    changes: { [prop: string]: T1 }, obj: { [prop: string]: T2 }, defaults: { [prop: string]: T2 },
    keyFn: (key: string) => string = identity, projFn: (value: T1) => T2 = identity,
    eqFn: (v1: T2, v2: T2) => boolean = (v1, v2) => v1 === v2
  ): boolean {
    const visited = {};
    let changed = false;
    forOwn(changes, (rawValue, rawKey) => {
      const key = keyFn(rawKey);
      visited[key] = true;
      if (hasOwnProperty.call(obj, key)) {
        const oldValue = obj[key];
        const newValue = rawValue !== undefined ? projFn(rawValue) : defaults[key];
        if (oldValue !== newValue && !eqFn(oldValue, newValue)) {
          obj[key] = newValue;
          changed = true;
        }
      }
    });

    forOwn(defaults, (defaultValue, key) => {
      if (!visited[key] && !eqFn(obj[key], defaultValue)) {
        obj[key] = defaultValue;
        changed = true;
      }
    });

    return changed;
  }
}
