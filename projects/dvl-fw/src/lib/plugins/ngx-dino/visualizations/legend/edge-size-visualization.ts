// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../../shared/object-factory';
import { Project } from '../../../../shared/project';
import { Visualization } from '../../../../shared/visualization';
import { DefaultVisualization } from '../../../default/default-visualization';
import { EdgeSizeComponent } from '../../components/legend/edge-size/edge-size.component';

export class EdgeSizeVisualization extends DefaultVisualization {
  readonly component = EdgeSizeComponent;
  readonly graphicSymbolOptions = [
    {
      id: 'items', label: 'Items', type: 'line',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'id' },
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
