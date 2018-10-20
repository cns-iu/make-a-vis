import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GraphicVariableOption, Visualization, GraphicSymbolOption,
  ProjectSerializerService, DvlFwVisualizationComponent, GraphicVariable } from 'dvl-fw';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';
import { uniqueId } from 'lodash';
import { SidenavState, getLoadedProjectSelector } from '../../toolbar/shared/store';
import { Store, select } from '@ngrx/store';
import { map, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'mav-graphic-variable-legend',
  templateUrl: './graphic-variable-legend.component.html',
  styleUrls: ['./graphic-variable-legend.component.css']
})
export class GraphicVariableLegendComponent implements OnInit, OnChanges {
  @Input() graphicSymbolOption: GraphicSymbolOption;
  @Input() graphicVariableOption: GraphicVariableOption;
  @Input() visualization: Visualization;

  graphicVariable: GraphicVariable;
  legendVisualizationTypes = []; // ['color', 'edge-size', 'node-size'];

  @ViewChild('visualization') legendComponent: DvlFwVisualizationComponent;

  constructor(private store: Store<SidenavState>, private updateService: UpdateVisService, private serializer: ProjectSerializerService) { }

  ngOnInit() {
    this.updateService.update.subscribe((visualization) => {
      this.visualization = visualization;
      this.visualizationUpdated();
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.hasOwnProperty('visualization')) {
      this.visualizationUpdated();
    }
  }

  private visualizationUpdated() {
    if (!this.visualization) { return; }
    const graphicSymbol = this.visualization.graphicSymbols[this.graphicSymbolOption.id];
    if (!graphicSymbol) { return; }
    const graphicVariable = graphicSymbol.graphicVariables[this.graphicVariableOption.id || this.graphicVariableOption.type];
    this.graphicVariable = graphicVariable;

    const template = this.graphicVariableOption.visualization;
    if (this.legendVisualizationTypes.indexOf(template) !== -1) {
      const preData: any = {
        id: `legend-visualization-${uniqueId()}`,
        template,
        properties: {},
        graphicSymbols: {
          items: graphicSymbol.id
        }
      };
      this.store.pipe(
        select(getLoadedProjectSelector),
        mergeMap(project => this.serializer.createVisualization(
          this.graphicVariableOption.visualization, preData, project))
      ).subscribe(legend => {
        this.legendComponent.data = legend;
        this.legendComponent.runDataChangeDetection();
      });
    } else if (this.legendComponent) {
      this.legendComponent.data = null;
      this.legendComponent.runDataChangeDetection();
    }
  }
}
