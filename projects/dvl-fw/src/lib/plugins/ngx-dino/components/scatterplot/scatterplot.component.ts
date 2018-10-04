import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Observable, EMPTY } from 'rxjs';
import { clone, forOwn, identity } from 'lodash';
import { RawChangeSet, simpleField, constant } from '@ngx-dino/core';
import { ScatterplotComponent as NgxScatterplotComponent } from '@ngx-dino/scatterplot';
import { VisualizationComponent, OnPropertyChange, OnGraphicSymbolChange } from './../../../../shared/visualization-component';
import { GraphicSymbol } from './../../../../shared/graphic-symbol';
import { Visualization } from './../../../../shared/visualization';

const fieldNameMapping = {
  'areaSize': 'sizeField', 'shape': 'shapeField', 'color': 'colorField',
  'strokeColor': 'strokeColorField'
};
const emptyField = simpleField({ id: 'empty', label: 'empty', operator: constant(undefined) }).getBoundField();
const defaultProperties = {
  enableTooltip: false, xAxisArrow: true, yAxisArrow: true,
  gridlines: false, gridlinesColor: 'lightgrey', gridlinesOpacity: 0.7,
  tickLabelColor: 'lightblack', showAxisIndicators: false, showAxisLabels: false,
};
const defaultFields = {
  'pointIdField': emptyField, 'strokeColorField': emptyField,
  'xField': emptyField, 'yField': emptyField, 'colorField': emptyField,
  'shapeField': emptyField, 'sizeField': emptyField, 'pulseField': emptyField,
  'tooltipTextField': emptyField
};


@Component({
  selector: 'dvl-vis-scatterplot',
  templateUrl: './scatterplot.component.html',
  styleUrls: ['./scatterplot.component.css']
})
export class ScatterplotComponent implements VisualizationComponent, OnInit, OnChanges, OnPropertyChange, OnGraphicSymbolChange {
  @Input() data: Visualization;
  stream: Observable<RawChangeSet>;
  properties: Pick<
    NgxScatterplotComponent,
    'enableTooltip' | 'xAxisArrow' | 'yAxisArrow' |
    'gridlines' | 'gridlinesColor' | 'gridlinesOpacity' |
    'tickLabelColor' | 'showAxisIndicators' | 'showAxisLabels'
  >;
  fields: Pick<
    NgxScatterplotComponent,
    'pointIdField' | 'strokeColorField' | 'xField' | 'yField' |
    'colorField' | 'shapeField' | 'sizeField' | 'pulseField' | 'tooltipTextField'
  >;

  constructor() {
    this.reset();
  }

  ngOnInit() {
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
    const changed = this.applyChanges(changes, newProperties, defaultProperties);
    if (changed) {
      this.properties = newProperties;
    }
  }

  dvlOnGraphicSymbolChange(changes: SimpleChanges): void {
    if ('points' in changes) {
      const change = changes['points'];
      const currentValue: GraphicSymbol = change.currentValue;
      const previousValue: GraphicSymbol = change.previousValue;
      const { recordStream: currentStream, graphicVariables } = currentValue || {} as GraphicSymbol;
      const { recordStream: previousStream } = previousValue || {} as GraphicSymbol;

      if (!currentValue) {
        this.stream = EMPTY;
        this.fields = defaultFields;
        return;
      } else if (!previousValue || currentStream !== previousStream) {
        this.stream = currentStream ? currentStream.asObservable() : EMPTY;
      }

      const newFields = clone(this.fields);
      const changed = this.applyChanges(
        graphicVariables, newFields, defaultFields, key => fieldNameMapping[key],
        variable => variable.asBoundField(), (v1, v2) => v1.equals(v2)
      );
      if (changed) {
        this.fields = newFields;
      }
    }
  }

  private reset(): void {
    this.stream = EMPTY;
    this.properties = defaultProperties;
    this.fields = defaultFields;
  }

  private applyChanges<T1, T2>(
    changes: { [prop: string]: T1 },
    obj: { [prop: string]: T2 },
    defaults: { [prop: string]: T2 },
    keyFn?: (key: string) => string,
    projFn?: (value: T1) => T2,
    eqFn?: (value1: T2, value2: T2) => boolean
  ): boolean {
    keyFn = keyFn || identity;
    projFn = projFn || identity;
    eqFn = eqFn || ((v1, v2) => v1 === v2);

    const hasOwnProperty = ({}).hasOwnProperty;
    let changed = false;
    forOwn(changes, (rawValue, rawKey) => {
      const key = keyFn(rawKey);
      if (hasOwnProperty.call(obj, key)) {
        const oldValue = obj[key];
        const newValue = rawValue !== undefined ? projFn(rawValue) : defaults[key];
        if (!eqFn(oldValue, newValue)) {
          obj[key] = newValue;
          changed = true;
        }
      }
    });

    return changed;
  }
}
