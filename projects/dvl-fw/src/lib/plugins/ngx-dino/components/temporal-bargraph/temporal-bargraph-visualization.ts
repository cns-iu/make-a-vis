import { Visualization } from '../../../../shared/visualization';
import { Project } from '../../../../shared/project';
import { ObjectFactory, ObjectFactoryRegistry } from '../../../../shared/object-factory';
import { DefaultVisualization } from '../../../default/default-visualization';
import { TemporalBargraphComponent } from './temporal-bargraph.component';

export class TemporalBargraphVisualization extends DefaultVisualization {
  readonly component = TemporalBargraphComponent;
  readonly graphicSymbolOptions = [
    // TODO: Specify valid options
  ];
}

export class TemporalBargraphVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'science-map';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new TemporalBargraphVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
