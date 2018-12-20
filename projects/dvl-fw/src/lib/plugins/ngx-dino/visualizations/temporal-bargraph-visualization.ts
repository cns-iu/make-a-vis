// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { TemporalBargraphComponent } from '../components/temporal-bargraph/temporal-bargraph.component';

export class TemporalBargraphVisualization extends DefaultVisualization {
  readonly description = 'TODO';
  readonly component = TemporalBargraphComponent;
  readonly graphicSymbolOptions = [{
    id: 'bars', label: 'Bars', type: 'area',
    graphicVariableOptions: [
      { type: 'identifier', label: 'Identifier' },
      { type: 'x-start', label: 'X-Axis Start' },
      { type: 'x-end', label: 'X-Axis End' },
      { type: 'y-order', label: 'Y-Axis Order' },
      { type: 'height', label: 'Size' },
      { type: 'color', label: 'Color Hue', visualization: 'color' },
      // { type: 'transparency', label: 'Transparency'},
      // { type: 'strokeColor', label: 'Stroke Color Hue', visualization: 'color' },
      // { type: 'strokeTransparency', label: 'Stroke Transparency'},
      { type: 'label', label: 'Label'},
      { type: 'tooltip', label: 'Tooltip'}
    ]
  }];
}

export class TemporalBargraphVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'temporal-bargraph';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new TemporalBargraphVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
