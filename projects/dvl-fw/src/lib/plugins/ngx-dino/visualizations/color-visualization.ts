// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { ColorComponent } from '../components/color/color.component';

export class ColorVisualization extends DefaultVisualization {
  readonly component = ColorComponent;
  readonly graphicSymbolOptions = [
    {
      id: 'items', label: 'Items', type: 'area',
      graphicVariableOptions: [
        { type: 'identifier', label: 'Identifier', visualization: 'id' },
        { type: 'text', label: 'Label', visualization: 'label' },
        { type: 'color', label: 'Color Hue', visualization: 'color' }
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
