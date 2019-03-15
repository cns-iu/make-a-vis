// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { ScatterplotComponent } from '../components/scatterplot/scatterplot.component';


export class ScatterplotVisualization extends DefaultVisualization {
  // tslint:disable-next-line: max-line-length
  readonly description = 'A scatter graph visualization uses Cartesian coordinates as a reference system. In the current MAV, records are represented by circles. Circles are placed based on values for two data variables: one plotted along the x-axis, the other along the y-axis. Circles can be size coded and color coded to represent additional data variables. A third data variable can be added to the graph using tooltips for circles.';
  readonly component = ScatterplotComponent;
  readonly graphicSymbolOptions = [{
    id: 'points', label: 'Points', type: 'area',
    graphicVariableOptions: [
      { type: 'identifier', label: 'Identifier', visualization: 'id', scaleType: 'ratio', required: true },
      { type: 'axis', label: 'X-Axis', id: 'x', visualization: 'x-axis', required: true },
      { type: 'axis', label: 'Y-Axis', id: 'y', visualization: 'y-axis', required: true },
      { type: 'color', label: 'Color Hue', visualization: 'color', scaleType: 'nominal', staticVisualization: 'color-area' },
      // { type: 'strokeColor', label: 'Stroke Color Hue', visualization: 'color' },
      { type: 'areaSize', label: 'Size', visualization: 'node-size', scaleType: 'ratio', staticVisualization: 'area-size' },
      // { type: 'shape', label: 'Shape' },
      // { type: 'transparency', label: 'Transparency' },
      // { type: 'strokeTransparency', label: 'Stroke Transparency' },
      { id: 'tooltip', type: 'text', label: 'Tooltip', visualization: 'label' }
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
