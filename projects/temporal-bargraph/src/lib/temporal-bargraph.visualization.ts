import { DefaultVisualization, ObjectFactory, ObjectFactoryRegistry, Project, Visualization } from '@dvl-fw/core';

import { TemporalBargraphComponent } from './temporal-bargraph.component';

export class TemporalBargraphVisualization extends DefaultVisualization {
  // tslint:disable-next-line: max-line-length
  readonly defaultDescription = 'A temporal bar graph is a visualization where each record is presented as a labeled horizontal bar with a specific start and end date. The area of each bar encodes a numerical attribute value (e.g., total amount of funding). Bars may be color coded to present categorical attribute values of records. An additional variable can be presented through tooltips on the bars.';
  readonly component = TemporalBargraphComponent;
  readonly graphicSymbolOptions = [{
    id: 'bars', label: 'Bars', type: 'area',
    graphicVariableOptions: [
      { id: 'x-start', type: 'axis', label: 'X-Axis Start', visualization: 'start', scaleType: 'ratio', required: true },
      { id: 'x-end', type: 'axis', label: 'X-Axis End', visualization: 'end', scaleType: 'ratio', required: true },
      { type: 'identifier', label: 'Identifier', visualization: 'id', scaleType: 'ratio', required: true },
      { id: 'y-order', type: 'axis', label: 'Y-Axis Order', advanced: true },
      { id: 'height', type: 'areaSize', label: 'Size', visualization: 'edge-size', scaleType: 'ratio', staticVisualization: 'thickness' },
      { type: 'color', label: 'Color Hue', visualization: 'color', scaleType: 'nominal', staticVisualization: 'color-area' },
      { id: 'strokeColor', type: 'color', label: 'Stroke Color Hue', visualization: 'color', advanced: true },
      { type: 'transparency', label: 'Transparency', advanced: true },
      { id: 'strokeTransparency', type: 'transparency', label: 'Stroke Transparency', advanced: true},
      { id: 'label', type: 'text', label: 'Label', visualization: 'label', scaleType: 'nominal' },
      { id: 'tooltip', type: 'text', label: 'Tooltip', visualization: 'label' },
      { type: 'labelPosition', label: 'Label Position', advanced: true },
    ]
  }];
}

export class TemporalBargraphVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'temporal-bargraph';
  readonly type = 'visualization';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): Visualization {
    return new TemporalBargraphVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
