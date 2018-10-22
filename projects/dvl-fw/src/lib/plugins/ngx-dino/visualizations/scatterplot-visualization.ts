import { ObjectFactory } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { ObjectFactoryRegistry } from '../../../shared/object-factory';
import { DefaultVisualization } from '../../default/default-visualization';
import { ScatterplotComponent } from './../components/scatterplot/scatterplot.component';


export class ScatterplotVisualization extends DefaultVisualization {
  readonly component = ScatterplotComponent;
  readonly graphicSymbolOptions = [{
    id: 'points', label: 'Points', type: 'area',
    graphicVariableOptions: [
      { type: 'identifier', label: 'Identifier' },
      { type: 'axis', label: 'X-Axis', id: 'x' },
      { type: 'axis', label: 'Y-Axis', id: 'y' },
      { type: 'areaSize', label: 'Area Size', visualization: 'node-size' },
      { type: 'shape', label: 'Shape' },
      { type: 'color', label: 'Color', visualization: 'color' },
      { type: 'strokeColor', label: 'Stroke Color', visualization: 'color' }
    ]
  }];
}

export class ScatterplotVisualizationFactory implements ObjectFactory<Visualization, Project> {
  id = 'scattergraph';
  type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new ScatterplotVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
