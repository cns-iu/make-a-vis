// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { TemporalBargraphComponent } from '../components/temporal-bargraph/temporal-bargraph.component';

export class TemporalBargraphVisualization extends DefaultVisualization {
  // tslint:disable-next-line: max-line-length
  readonly description = 'This temporal bar graph visualization represents each record as a horizontal bar with a specific start and end date and a text label on its left side. The area of each bar encodes a numerical attribute value, e.g., total amount of funding. Bars may be colored to present categorical attribute values of records. Tooltips for bars can be used to represent an additional data variable.';
  readonly component = TemporalBargraphComponent;
  readonly graphicSymbolOptions = [{
    id: 'bars', label: 'Bars', type: 'area',
    graphicVariableOptions: [
      { type: 'identifier', label: 'Identifier', visualization: 'id', scaleType: 'ratio', required: true },
      { id: 'x-start', type: 'axis', label: 'X-Axis Start', visualization: 'start', scaleType: 'ratio', required: true },
      { id: 'x-end', type: 'axis', label: 'X-Axis End', visualization: 'end', scaleType: 'ratio', required: true },
      // { id: 'y-order', type: 'axis', label: 'Y-Axis Order' },
      { id: 'height', type: 'areaSize', label: 'Size', visualization: 'edge-size', scaleType: 'ratio', staticVisualization: 'thickness' },
      { type: 'color', label: 'Color Hue', visualization: 'color', scaleType: 'nominal', staticVisualization: 'color-area' },
      // { type: 'transparency', label: 'Transparency'},
      // { type: 'strokeColor', label: 'Stroke Color Hue', visualization: 'color' },
      // { type: 'strokeTransparency', label: 'Stroke Transparency'},
      { id: 'label', type: 'text', label: 'Label', visualization: 'label', scaleType: 'nominal' },
      { id: 'tooltip', type: 'text', label: 'Tooltip', visualization: 'label' }
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
