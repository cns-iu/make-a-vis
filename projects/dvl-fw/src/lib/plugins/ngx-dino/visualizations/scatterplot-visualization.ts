// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { ScatterplotComponent } from '../components/scatterplot/scatterplot.component';


export class ScatterplotVisualization extends DefaultVisualization {
  // TODO remove below string
  readonly description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
   incididunt ut labore et dolore magna aliqua.
  Dui accumsan sit amet nulla facilisi. Neque volutpat ac tincidunt vitae semper quis lectus nulla at.
  Enim ut sem viverra aliquet eget sit. Vehicula ipsum a arcu cursus vitae congue mauris. Urna et pharetra
   pharetra massa massa. Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. At ultrices mi
    tempus imperdiet nulla malesuada pellentesque elit eget. Sagittis nisl rhoncus mattis
     rhoncus urna neque viverra justo. Urna cursus eget nunc scelerisque viverra
     mauris in. Auctor urna nunc id cursus metus aliquam. Sed vulputate mi sit
      amet mauris. Dolor magna eget est lorem ipsum dolor sit amet consectetur. Pretium aenean
      pharetra magna ac placerat vestibulum. Turpis cursus in hac habitasse platea dictumst
       quisque sagittis. Adipiscing vitae proin sagittis nisl rhoncus mattis
       rhoncus urna. Massa placerat duis ultricies lacus sed. Orci eu lobortis
        elementum nibh tellus. Ac turpis egestas maecenas pharetra convallis posuere morbi leo.`;
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
