// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { GraphicSymbol } from '../../shared/graphic-symbol';
import { GraphicVariable } from '../../shared/graphic-variable';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';
import { RecordStream } from '../../shared/record-stream';

export class DefaultGraphicSymbol implements GraphicSymbol {
  id: string;
  type: string;
  recordStream: RecordStream;
  graphicVariables: { [id: string]: GraphicVariable; };

  constructor(data: {id: string, type: string, recordStream: string, graphicVariables: any}, private project: Project) {
    this.id = data.id;
    this.type = data.type;
    this.recordStream = project.getRecordStream(data.recordStream);

    this.graphicVariables = {};
    for (const [id, gvarData] of Object.entries(data.graphicVariables)) {
      const recordSet = project.recordSets.find((rs) => rs.id === gvarData['recordSet']);
      if (!recordSet) {
        throw new Error(`${id}: RecordSet => ${gvarData['recordSet']} not found.`);
      }
      const gvar: Partial<GraphicVariable> = {
        recordStream: this.recordStream,
        recordSet,
        dataVariable: recordSet.dataVariables.find((dv) => dv.id === gvarData['dataVariable']),
        type: gvarData['graphicVariableType'],
        id: gvarData['graphicVariableId']
      };
      const matches = project.findObjects(project.graphicVariables, gvar);
      if (matches.length > 0) {
        this.graphicVariables[id] = matches[0];
      } else {
        throw new Error(`${id}: ${this.recordStream.id} => ${JSON.stringify(gvarData, null, 2)} not found in graphicVariables`);
      }
    }
  }

  toJSON(): any {
    const graphicVariables = {};
    for (const [id, gvar] of Object.entries(this.graphicVariables)) {
      graphicVariables[id] = {
        recordSet: gvar.recordSet.id,
        dataVariable: gvar.dataVariable.id,
        graphicVariableType: gvar.type,
        graphicVariableId: gvar.id
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
