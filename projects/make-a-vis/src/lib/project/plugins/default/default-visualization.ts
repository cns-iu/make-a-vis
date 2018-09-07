import { GraphicSymbol } from '../../shared/graphic-symbol';
import { Visualization } from '../../shared/visualization';
import { Project } from '../../shared/project';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';

export class DefaultVisualization implements Visualization {
  id: string;
  template = 'default';
  properties: { [key: string]: any; };
  graphicSymbols: { [slot: string]: GraphicSymbol; };

  constructor(data: any, project: Project) {
    const graphicSymbols: any = {};
    for (const [slot, symbolId] of Object.entries(data.graphicSymbols)) {
      const matches = project.findObjects(project.graphicVariables, {id: symbolId});
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
      properties: this.properties,
      graphicSymbols
    };
  }
}

export class DefaultVisualizationFactory implements ObjectFactory<Visualization, Project> {
  id = 'default';
  type = 'visualization';

  fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Visualization {
    return new DefaultVisualization(data, context);
  }
  toJSON(instance: Visualization, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
