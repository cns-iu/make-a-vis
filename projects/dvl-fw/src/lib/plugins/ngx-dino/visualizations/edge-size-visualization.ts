import { Visualization } from '../../../shared/visualization';
import { Project } from '../../../shared/project';
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { DefaultVisualization } from '../../default/default-visualization';
import { EdgeSizeComponent } from './../components/edge-size/edge-size.component';

export class EdgeSizeVisualization extends DefaultVisualization {
  readonly component = EdgeSizeComponent;
  readonly graphicSymbolOptions = [
    {
      id: 'edges', label: 'Edges', type: 'line',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'none' },
        { type: 'strokeColor', label: 'Stroke Color', visualization: 'color' },
        { type: 'strokeWidth', label: 'Stroke Width', visualization: 'edge-size' }
      ]
    }
  ];
}

export class EdgeSizeVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'edge-size';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new EdgeSizeVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
