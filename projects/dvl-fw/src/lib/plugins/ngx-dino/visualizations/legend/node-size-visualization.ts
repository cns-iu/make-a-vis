// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../../shared/object-factory';
import { Project } from '../../../../shared/project';
import { Visualization } from '../../../../shared/visualization';
import { DefaultVisualization } from '../../../default/default-visualization';
import { NodeSizeComponent } from '../../components/legend/node-size/node-size.component';

export class NodeSizeVisualization extends DefaultVisualization {
  readonly component = NodeSizeComponent;
  readonly graphicSymbolOptions = [
    {
      id: 'items', label: 'Items', type: 'area',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'id' },
        { type: 'areaSize', label: 'Size', visualization: 'node-size'}
      ]
    }
  ];
}

export class NodeSizeVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'node-size';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new NodeSizeVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
