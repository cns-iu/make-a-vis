import { access, BoundField, simpleField } from '@ngx-dino/core';

import { GraphicVariable } from '../../shared/graphic-variable';
import { GraphicVariableMapping } from '../../shared/graphic-variable-mapping';
import { ObjectFactory } from '../../shared/object-factory';
import { Project } from '../../shared/project';
import { RecordStream } from '../../shared/record-stream';
import { ObjectFactoryRegistry } from './../../shared/object-factory';


export class DefaultGraphicVariable implements GraphicVariable {
  id: string;
  label: string;
  type: string;
  selector: string;

  constructor(data: any) {
    Object.assign(this, data);
  }

  asBoundField<T = any>(): BoundField<T> {
    return simpleField<T>({ label: this.label, operator: access(this.selector) }).getBoundField();
  }
  toJSON(): any {
    return Object.assign({}, this);
  }
}

export class DefaultGraphicVariableMapping implements GraphicVariableMapping {
  recordStream: RecordStream;
  mappings: {
    [recordSetId: string]: {
      [dataVariableId: string]: {
        [graphicVariableType: string]: GraphicVariable[];
      }
    }
  };

  constructor(data: any, private project: Project) {
    this.recordStream = project.getRecordStream(data.recordStream);
    this.mappings = data.mappings;
  }

  toJSON(): any {
    return {
      recordStream: this.recordStream.id,
      mappings: this.mappings
    };
  }
}

export class DefaultGraphicVariableMappingFactory implements ObjectFactory<GraphicVariableMapping, Project> {
  id = 'default';
  type = 'graphicVariableMapping';

  fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): GraphicVariableMapping {
    return new DefaultGraphicVariableMapping(data, context);
  }
  toJSON(instance: GraphicVariableMapping, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
