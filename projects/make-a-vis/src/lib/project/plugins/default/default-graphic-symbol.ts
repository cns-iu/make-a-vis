import { GraphicVariable } from '../../shared/graphic-variable';
import { Project } from '../../shared/project';
import { RecordStream } from '../../shared/record-stream';
import { GraphicSymbol } from '../../shared/graphic-symbol';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';


export class DefaultGraphicSymbol implements GraphicSymbol {
  id: string;
  type: string;
  recordStream: RecordStream;
  graphicVariables: { [id: string]: GraphicVariable; };

  constructor(data: any, private project: Project) {
    this.id = data.id;
    this.type = data.type;
    this.recordStream = project.getRecordStream(data.recordStream);

    this.graphicVariables = {};
    for (const [id, gvar] of Object.entries(data.graphicVariables)) {
      const matches = project.findObjects(project.graphicVariables, gvar);
      if (matches.length > 0) {
        this.graphicVariables[id] = matches[0];
      } else {
        throw new Error(`${id}: ${JSON.stringify(gvar)} not found in graphicVariables`);
      }
    }
  }

  toJSON(): any {
    const graphicVariables = {};
    for (const [id, gvar] of Object.entries(this.graphicVariables)) {
      graphicVariables[id] = {
        recordSet: gvar.recordSet.id,
        dataVariable: gvar.dataVariable.id,
        graphicVariable: gvar.id
      };
    }

    return {
      id: this.id,
      type: this.type,
      recordStream: this.recordStream.id,
      graphicVariables
    };
  }
}

export class DefaultGraphicSymbolFactory implements ObjectFactory<GraphicSymbol, Project> {
  id = 'default';
  type = 'graphicSymbolMappings';

  fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): GraphicSymbol {
    return new DefaultGraphicSymbol(data, context);
  }
  toJSON(instance: GraphicSymbol, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}