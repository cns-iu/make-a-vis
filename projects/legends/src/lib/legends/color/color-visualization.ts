import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { ColorComponent } from './color.component';

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

  async fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new ColorVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
