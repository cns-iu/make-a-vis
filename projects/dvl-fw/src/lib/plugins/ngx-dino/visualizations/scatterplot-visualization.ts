// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { ScatterplotComponent } from '../components/scatterplot/scatterplot.component';


export class ScatterplotVisualization extends DefaultVisualization {
  // TODO remove below string
  readonly description = `He determined to drop his litigation with the monastry, and relinguish
   his claims to the wood-cuting and fishery rihgts at once. He was the more ready to do this becuase the
    rights had becom much less valuable, and he had indeed the vaguest idea where the wood and river in quedtion were.`;
  readonly component = ScatterplotComponent;
  readonly graphicSymbolOptions = [{
    id: 'points', label: 'Points', type: 'area',
    graphicVariableOptions: [
      { type: 'identifier', label: 'Identifier' },
      { type: 'axis', label: 'X-Axis', id: 'x' },
      { type: 'axis', label: 'Y-Axis', id: 'y' },
      { type: 'color', label: 'Color', visualization: 'color' },
      { type: 'strokeColor', label: 'Stroke Color', visualization: 'color' },
      { type: 'areaSize', label: 'Area Size', visualization: 'node-size' },
      { type: 'shape', label: 'Shape' },
      { type: 'transparency', label: 'Transparency' },
      { type: 'strokeTransparency', label: 'Stroke Transparency' },
      { type: 'tooltip', label: 'Tooltip'}
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
