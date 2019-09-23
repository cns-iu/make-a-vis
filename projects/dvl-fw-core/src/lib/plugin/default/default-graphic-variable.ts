import { access, BoundField, DataType, Field } from '@ngx-dino/core';

import { DataVariable, GraphicVariable, Project, RecordSet, RecordStream } from '../../interfaces';
import { ObjectFactory, ObjectFactoryRegistry } from '../object-factory';

export type DefaultGraphicVariableArg =
  Pick<GraphicVariable, 'id' | 'label' | 'type' | 'selector' | 'recordStream' | 'recordSet' | 'dataVariable'>;

export class DefaultGraphicVariable implements GraphicVariable {
  id: string;
  label: string;
  type: string;
  selector: string;

  recordStream: RecordStream;
  recordSet: RecordSet;
  dataVariable: DataVariable;

  constructor(data: DefaultGraphicVariableArg) {
    Object.assign(this, data);
  }

  asBoundField<T = any>(): BoundField<T> {
    return new Field<T>({
      id: this.id,
      label: this.label,
      dataType: this.getDataType(),
      mapping: { [Field.defaultSymbol]: access(this.selector) }
    }).getBoundField();
  }

  toJSON(): any {
    return Object.assign({}, this, {
      recordStream: this.recordStream.id,
      recordSet: this.recordSet.id,
      dataVariable: this.dataVariable.id
    });
  }

  private getDataType(): DataType {
    // TODO: This mapping should be smarter/revised.
    switch (this.dataVariable.dataType) {
      case 'integer':
      case DataType.Number:
        return DataType.Number;

      case DataType.Boolean:
        return DataType.Boolean;

      default:
        return DataType.String;
    }
  }
}

export type PartialDefaultGraphicVariableArg =
  Pick<DefaultGraphicVariableArg, 'selector'> &
  Partial<Pick<DefaultGraphicVariableArg, 'id' | 'label'>>;
export interface DefaultGraphicVariableMappingArg {
  recordStream: string;
  mappings: {
    [recordSetId: string]: {
      [dataVariableId: string]: {
        [type: string]:
          PartialDefaultGraphicVariableArg[]
      }
    }
  };
}

export class DefaultGraphicVariableMapping {
  static fromJSON(allData: DefaultGraphicVariableMappingArg[], project: Project): GraphicVariable[] {
    const variables: GraphicVariable[] = [];
    for (const data of allData) {
      const recordStream = project.getRecordStream(data.recordStream);
      for (const [recordSetId, dvMapping] of Object.entries(data.mappings)) {
        for (const [dataVariableId, gvMapping] of Object.entries(dvMapping)) {
          for (const [type, gvDatas] of Object.entries(gvMapping)) {
            const recordSet = project.recordSets.find(rs => rs.id === recordSetId);
            const dataVariable = recordSet.dataVariables.find(dv => dv.id === dataVariableId);
            const gvDataArray: any[] = <any[]>gvDatas;
            for (const gvData of gvDataArray) {
              if (!gvData.id && gvDataArray.length === 1) {
                gvData.id = type;
              }
              variables.push(new DefaultGraphicVariable({
                id: gvData.id, label: gvData.label || dataVariable.label || gvData.id, type, selector: gvData.selector,
                recordStream, recordSet, dataVariable
              }));
            }
          }
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

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): GraphicVariable[] {
    return DefaultGraphicVariableMapping.fromJSON(data, context);
  }

  toJSON(instance: GraphicVariable[], _context: Project, _registry: ObjectFactoryRegistry): any {
    return DefaultGraphicVariableMapping.toJSON(instance);
  }
}
