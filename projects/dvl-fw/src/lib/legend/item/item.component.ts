import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { every, find, forEach, propertyOf, some } from 'lodash';
import { BehaviorSubject, ObservableInput } from 'rxjs';
import { catchError, switchAll, tap } from 'rxjs/operators';

import { GraphicSymbol } from '../../shared/graphic-symbol';
import { GraphicVariable } from '../../shared/graphic-variable';
import { Project } from '../../shared/project';
import { ProjectSerializerService } from '../../shared/project-serializer-service';
import { GraphicVariableOption, Visualization } from '../../shared/visualization';

/** The valid options for selecting static/dynamic legends */
export type LegendType = 'dynamic-only' | 'static-only' | 'dynamic-preferred' | 'static-preferred';

/** Data representing an empty visualization */
const EMPTY_VIS: ObservableInput<Visualization> = [undefined];

/**
 * Renderes a single legend with a title and subtitle
 */
@Component({
  selector: 'dvl-legend-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnChanges, OnDestroy {
  /** The project to which the legend belongs */
  @Input() project: Project;
  /** The visualization to which the legend belongs */
  @Input() visualization: Visualization;
  /** The symbol for the legend */
  @Input() symbol: string;
  /** The variable to display a legend for */
  @Input() variable: string;
  @Input() type: LegendType;
  @Input() advanced: boolean;

  title: string = undefined;
  subtitle: string = undefined;

  private template: string = undefined;
  private symbolObj: GraphicSymbol = undefined;
  private variableObj: GraphicVariable = undefined;

  private innerVisualization$ = new BehaviorSubject<ObservableInput<Visualization>>(EMPTY_VIS);
  visualization$ = this.innerVisualization$.pipe(switchAll());

  constructor(private serializer: ProjectSerializerService) { }

  ngOnChanges(changes: SimpleChanges) {
    const { project, visualization, symbol, variable } = this;
    const checkedValues = [project, visualization, symbol, variable];
    const checkedProperties = ['project', 'visualization', 'symbol', 'variable', 'type', 'advanced'];

    if (!every(checkedValues) || !this.setValues()) {
      this.clear();
    } else if (some(checkedProperties, propertyOf(changes))) {
      this.update();
    }
  }

  ngOnDestroy() {
    this.clear();
  }

  private update(): void {
    const legend = this.generateLegend();
    this.innerVisualization$.next(legend);
  }

  private clear(): void {
    this.innerVisualization$.next(EMPTY_VIS);
  }

  private setValues(): boolean {
    const { visualization, symbol, variable, advanced } = this;
    const symbolOpt = find(visualization.graphicSymbolOptions, ['id', symbol]);
    const variableOpt = symbolOpt && find(symbolOpt.graphicVariableOptions, ({ id, type }) => {
      return id ? id === variable : type === variable;
    });
    const template = this.template = variableOpt && this.selectTemplate(variableOpt);
    const symbolObj = this.symbolObj = visualization.graphicSymbols[symbol];
    const variableObj = this.variableObj = symbolObj && symbolObj.graphicVariables[variable];
    const isDisabled = !advanced && variableOpt && variableOpt.advanced;

    this.title = variableOpt && variableOpt.label;
    this.subtitle = variableObj && `${ variableObj.recordSet.label }: ${ variableObj.label }`;

    const checkedValues = [!isDisabled, template, symbolObj, variableObj];
    if (every(checkedValues)) { return true; }
    // Clear internals for consistent state (all or nothing set)
    this.title = this.subtitle = this.template = undefined;
    this.symbolObj = this.variableObj = undefined;
    return false;
  }

  private selectTemplate(variableOpt: GraphicVariableOption): string {
    const { visualization: dynamicVis, staticVisualization: staticVis } = variableOpt;
    switch (this.type) {
      default: /** Fallthrough */
      case 'dynamic-preferred':
        return dynamicVis || staticVis;
      case 'static-preferred':
        return staticVis || dynamicVis;
      case 'dynamic-only':
        return dynamicVis;
      case 'static-only':
        return staticVis;
    }
  }

  private generateLegend(): ObservableInput<Visualization> {
    const { project, template, symbolObj, variableObj } = this;
    // Snapshot properties used by generateItemsSymbol
    // It is called inside an observable and therefore properties may have changed between
    // this call and the call to generateItemsSymbol
    const snapshot: ItemComponent = Object.setPrototypeOf({
      project, template, symbolObj, variableObj
    }, this);
    const preData: Partial<Visualization> = {
      id: `legend-item-${template}`, template, properties: {}, graphicSymbols: {}
    };

    if (!template) { return EMPTY_VIS; }
    return this.serializer.createVisualization(template, preData, null).pipe(
      tap(vis => vis.graphicSymbols['items'] = snapshot.generateItemsSymbol()),
      catchError(_error => [EMPTY_VIS])
    );
  }

  private generateItemsSymbol(): GraphicSymbol {
    const { project, template, symbolObj, variableObj } = this;
    const symbol: GraphicSymbol = Object.setPrototypeOf({
      id: 'items', graphicVariables: { }
    }, symbolObj);
    const variables = symbol.graphicVariables;

    // Copy special GraphicVariables
    variables['identifier'] = symbolObj.graphicVariables['identifier'];
    variables[variableObj.type] = variableObj;
    if (template === 'color') { variables['color'] = variableObj; }

    // Copy GraphicVariables with the same DataVariable
    const sourceDataVariable = variableObj.dataVariable;
    forEach(project.graphicVariables, variable => {
      const { type, dataVariable } = variable;
      if (dataVariable === sourceDataVariable && !variables[type]) {
        variables[type] = variable;
      }
    });

    return symbol;
  }
}
