import { Visualization } from '../../../shared/visualization';
import { Project } from '../../../shared/project';
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { DefaultVisualization } from '../../default/default-visualization';
import { ColorComponent } from '../components/color/color.component';

export class ColorVisualization extends DefaultVisualization {
  readonly component = ColorComponent;
  readonly graphicSymbolOptions = [
    {
      id: 'items', label: 'Items', type: 'area',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier' },
        { type: 'label', label: 'Label' },
        { type: 'color', label: 'Color', visualization: 'color' }
      ]
    }
  ];
}

export class ColorVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'color';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new ColorVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
