import { access, BoundField, simpleField } from '@ngx-dino/core';

import { DataVariable } from '../../shared/data-variable';
import { GraphicVariable } from '../../shared/graphic-variable';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';
import { RecordSet } from '../../shared/record-set';
import { RecordStream } from '../../shared/record-stream';


export class DefaultGraphicVariable implements GraphicVariable {
  id: string;
  label: string;
  type: string;
  selector: string;

  recordStream: RecordStream;
  recordSet: RecordSet;
  dataVariable: DataVariable;

  constructor(data: any) {
    Object.assign(this, data);
  }

  asBoundField<T = any>(): BoundField<T> {
    return simpleField<T>({ label: this.label, operator: access(this.selector) }).getBoundField();
  }
  toJSON(): any {
    return Object.assign({}, this, {
      recordSet: this.recordSet.id,
      dataVariable: this.dataVariable.id
    });
  }
}

export class DefaultGraphicVariableMapping {
  static fromJSON(data: any, project: Project): GraphicVariable[] {
    const recordStream = project.getRecordStream(data.recordStream);
    const variables: GraphicVariable[] = [];

    for (const [recordSetId, dvMapping] of Object.entries(data.mappings)) {
      for (const [dataVariableId, gvMapping] of Object.entries(dvMapping)) {
        for (const [type, gvData] of Object.entries(gvMapping)) {
          const recordSet = project.recordSets.find(rs => rs.id === recordSetId);
          const dataVariable = recordSet.dataVariables.find(dv => dv.id === dataVariableId);
          variables.push(Object.assign({}, <GraphicVariable>gvData, { recordSet, dataVariable, type }));
        }
      }
    }

    return variables;
  }

  static toJSON(graphicVariables: GraphicVariable[]): any[] {
    const mappings: any = {};
    for (const gvar of graphicVariables) {
      const recordStream = gvar.recordStream.id;
      const recordSet = gvar.recordSet.id;
      const dataVariable = gvar.dataVariable.id;
      const type = gvar.type;

      if (!mappings.hasOwnProperty(recordStream)) {
        mappings[recordStream] = {};
      }
      if (!mappings[recordStream].hasOwnProperty(recordSet)) {
        mappings[recordStream][recordSet] = {};
      }
      if (!mappings[recordStream][recordSet].hasOwnProperty(dataVariable)) {
        mappings[recordStream][recordSet][dataVariable] = {};
      }
      if (!mappings[recordStream][recordSet][dataVariable].hasOwnProperty(type)) {
        mappings[recordStream][recordSet][dataVariable][type] = [];
      }
      mappings[recordStream][recordSet][dataVariable][type].push({
        id: gvar.id,
        label: gvar.label || gvar.id,
        type: gvar.type,
        selector: gvar.selector
      });
    }
    return Object.entries(mappings).map(([recordStream, rsMapping]) => {
      return { recordStream, mappings: rsMapping };
    });
  }
}

export class DefaultGraphicVariableMappingFactory implements ObjectFactory<GraphicVariable[], Project> {
  id = 'default';
  type = 'graphicVariableMappings';

  fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): GraphicVariable[] {
    return DefaultGraphicVariableMapping.fromJSON(data, context);
  }
  toJSON(instance: GraphicVariable[], context: Project, registry: ObjectFactoryRegistry): any {
    return DefaultGraphicVariableMapping.toJSON(instance);
  }
}
