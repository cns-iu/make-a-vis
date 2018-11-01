// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { GraphicSymbol } from '../../shared/graphic-symbol';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';
import { Visualization } from '../../shared/visualization';

export class DefaultVisualization implements Visualization {
  id: string;
  template = 'default';
  properties: { [key: string]: any; };
  graphicSymbols: { [slot: string]: GraphicSymbol; };

  constructor(data: {id: string, template?: string, properties: any, graphicSymbols: any}, project: Project) {
    const graphicSymbols: any = {};
    for (const [slot, symbolId] of Object.entries(data.graphicSymbols)) {
      const matches = project.findObjects(project.graphicSymbols, {id: symbolId});
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
      return await registry.fromJSON<Visualization>('visualization', data.template, data, context);
    }
    return new DefaultVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
