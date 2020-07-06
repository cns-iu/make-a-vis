import {
  Component, ComponentFactoryResolver, ComponentRef, Input, OnChanges, OnInit, SimpleChange, SimpleChanges, Type,
  ViewContainerRef,
} from '@angular/core';
import { GraphicSymbol, Visualization, VisualizationComponent } from '@dvl-fw/core';
import { forOwn, isEmpty, isFunction } from 'lodash';

import { ClonedVisualization } from './utility';

interface VisualizationChange {
  currentValue: Visualization;
  previousValue: Visualization;
  firstChange: boolean;
}

export interface OnPropertyChange {
  dvlOnPropertyChange(changes: SimpleChanges): void;
}

export interface OnGraphicSymbolChange {
  dvlOnGraphicSymbolChange(changes: SimpleChanges): void;
}

@Component({
  selector: 'dvl-visualization',
  templateUrl: './visualization.component.html',
  styleUrls: ['./visualization.component.scss']
})
export class DvlFwVisualizationComponent implements OnInit, OnChanges {
  @Input() data: Visualization = undefined;

  private componentRef: ComponentRef<VisualizationComponent>;
  private currentData: Visualization;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
    if (this.data) {
      this.load();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.onDataChange(changes['data']);
    }
  }

  runDataChangeDetection(): void {
    this.onDataChange(new SimpleChange(this.currentData, this.data, false));
  }

  private onDataChange(change: SimpleChange): void {
    const { currentValue, previousValue, firstChange }: VisualizationChange = change;
    if (firstChange) { // Let ngOnInit take care of the first load
      return;
    }

    if (currentValue) {
      if (!previousValue || previousValue.component !== currentValue.component) {
        this.unload();
        this.load();
      } else {
        this.update();
      }
    } else {
      if (previousValue) {
        this.unload();
      }
    }
  }

  private createComponent(componentType: Type<VisualizationComponent>): ComponentRef<VisualizationComponent> {
    const { componentFactoryResolver, viewContainerRef } = this;
    try {
      const factory = componentFactoryResolver.resolveComponentFactory(componentType);
      const component = viewContainerRef.createComponent(factory);
      return component;
    } catch (error) {
      console.log(`Failed to create visualization component`, error);
      // TODO: Log error
      // TODO: Create default component?
      return undefined;
    }
  }

  private load(): void {
    const data = this.data;
    const componentType = data.component;
    if (!componentType) {
      // TODO: Use logger
      console.log(`Visualization Component is missing for type: ${data.template}`, data);
      return;
    }

    const newComponent = this.createComponent(componentType);
    if (!newComponent) {
      return;
    }

    const clonedData = new ClonedVisualization(data);
    clonedData.normalize();
    newComponent.instance.data = clonedData;
    // TODO: Call lifecycle?

    this.componentRef = newComponent;
    this.currentData = clonedData;
  }

  private unload(): void {
    const { componentRef, viewContainerRef } = this;
    if (!componentRef) {
      return;
    }

    viewContainerRef.clear();

    this.componentRef = undefined;
    this.currentData = undefined;
  }

  private update(): void {
    const { currentData, data } = this;
    const clonedData = new ClonedVisualization(data);
    clonedData.normalize();

    const propDiff = this.diff(clonedData.properties, currentData.properties, (v1, v2) => v1 === v2);
    const symDiff = this.diff(clonedData.graphicSymbols, currentData.graphicSymbols, this.graphicSymbolEquals.bind(this));

    this.applyDiff(currentData.properties, propDiff);
    this.applyDiff(currentData.graphicSymbols, symDiff);

    if (!isEmpty(propDiff)) {
      this.callDvlLifecycleHook('dvlOnPropertyChange', propDiff);
    }
    if (!isEmpty(symDiff)) {
      this.callDvlLifecycleHook('dvlOnGraphicSymbolChange', symDiff);
    }
  }

  private diff<T>(
    newData: Record<string, T>,
    oldData: Record<string, T>,
    eq: (newValue: T, oldValue: T) => boolean
  ): SimpleChanges {
    const hasOwnProperty = ({}).hasOwnProperty;
    const changes: SimpleChanges = Object.create(null);
    forOwn(newData, (value, prop) => {
      if (!hasOwnProperty.call(oldData, prop)) {
        changes[prop] = new SimpleChange(undefined, value, true);
      } else if (!eq(value, oldData[prop])) {
        changes[prop] = new SimpleChange(oldData[prop], value, false);
      }
    });
    forOwn(oldData, (value, prop) => {
      if (!hasOwnProperty.call(newData, prop)) {
        changes[prop] = new SimpleChange(value, undefined, false);
      }
    });

    return changes;
  }

  private applyDiff<T>(data: Record<string, T>, diff: SimpleChanges): void {
    forOwn(diff, (change, key) => {
      data[key] = change.currentValue;
    });
  }

  private graphicSymbolEquals(sym1: GraphicSymbol, sym2: GraphicSymbol): boolean {
    if (sym1 === undefined || sym2 === undefined) {
      return sym1 === sym2;
    }

    const { id: id1, type: type1, recordStream: rs1, graphicVariables: gv1 } = sym1;
    const { id: id2, type: type2, recordStream: rs2, graphicVariables: gv2 } = sym2;
    if (id1 !== id2 || type1 !== type2 || rs1 !== rs2) {
      return false;
    } else {
      const diff = this.diff(gv1, gv2, (v1, v2) => v1 === v2);
      return isEmpty(diff);
    }
  }

  private callDvlLifecycleHook(name: string, ...args: any[]): void {
    const ref = this.componentRef;
    const instance = ref && ref.instance;
    const hook = instance && instance[name];
    if (isFunction(hook)) {
      hook.apply(instance, args);
    }
  }
}
