import { Visualization } from '../../../shared/visualization';
import { Project } from '../../../shared/project';
import { ObjectFactory, ObjectFactoryRegistry } from '../../../shared/object-factory';
import { DefaultVisualization } from '../../default/default-visualization';
import { NetworkComponent } from './../components/network/network.component';

export class NetworkVisualization extends DefaultVisualization {
  readonly component = NetworkComponent;
  readonly graphicSymbolOptions = [
    // TODO: Specify valid options
  ];
}

export class NetworkVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'network';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new NetworkVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
