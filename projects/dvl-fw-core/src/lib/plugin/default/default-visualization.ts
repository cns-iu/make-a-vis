import { GraphicSymbol, Project, Visualization } from '../../interfaces';
import { ObjectFactory, ObjectFactoryRegistry } from '../object-factory';

export type DefaultVisualizationArg =
  Pick<Visualization, 'id' | 'properties'> &
  Partial<Pick<Visualization, 'template' | 'description'>> &
  { graphicSymbols: { [slot: string]: string } };

export class DefaultVisualization implements Visualization {
  id: string;
  description?: string;
  template = 'default';
  properties: { [key: string]: any; };
  graphicSymbols: { [slot: string]: GraphicSymbol; };

  constructor(data: DefaultVisualizationArg, project: Project) {
    const graphicSymbols: any = {};
    for (const [slot, symbolId] of Object.entries(data.graphicSymbols)) {
      const matches = project.findObjects(project.graphicSymbols, { id: symbolId });
      if (matches.length > 0) {
        graphicSymbols[slot] = matches[0];
      } else {
        throw new Error(`${slot}: ${symbolId} not found in graphicSymbols`);
      }
    }
    Object.assign(this, data, { graphicSymbols });
  }

  toJSON(): any {
    const graphicSymbols: any = {};
    for (const [slot, symbol] of Object.entries(this.graphicSymbols)) {
      graphicSymbols[slot] = symbol.id;
    }

    return {
      id: this.id,
      description: this.description,
      template: this.template,
      properties: this.properties,
      graphicSymbols
    };
  }
}

export class DefaultVisualizationFactory implements ObjectFactory<Visualization, Project> {
  id = 'default';
  type = 'visualization';

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<Visualization> {
    if (registry.hasObjectFactory('visualization', data.template)) {
      return registry.fromJSON<Visualization>('visualization', data.template, data, context);
    }
    return new DefaultVisualization(data, context);
  }

  toJSON(instance: Visualization, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
