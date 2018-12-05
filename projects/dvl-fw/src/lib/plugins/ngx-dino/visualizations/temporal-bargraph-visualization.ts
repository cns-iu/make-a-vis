// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { Project } from '../../../shared/project';
import { Visualization } from '../../../shared/visualization';
import { DefaultVisualization } from '../../default/default-visualization';
import { TemporalBargraphComponent } from '../components/temporal-bargraph/temporal-bargraph.component';

export class TemporalBargraphVisualization extends DefaultVisualization {
  readonly description = 'TODO';
  readonly component = TemporalBargraphComponent;
  readonly graphicSymbolOptions = [
    // TODO: Specify valid options
  ];
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
