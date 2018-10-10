import { Visualization } from '../../../../shared/visualization';
import { Project } from '../../../../shared/project';
import { ObjectFactory, ObjectFactoryRegistry } from '../../../../shared/object-factory';
import { DefaultVisualization } from '../../../default/default-visualization';
import { GeomapComponent } from './geomap.component';

export class GeomapVisualization extends DefaultVisualization {
  readonly component = GeomapComponent;
  readonly graphicSymbolOptions = [
    // TODO: Specify valid options
  ];
}

export class GeomapVisualizationFactory implements ObjectFactory<Visualization, Project> {
  readonly id = 'geomap';
  readonly type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    return new GeomapVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
