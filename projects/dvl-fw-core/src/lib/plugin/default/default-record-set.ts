import { find, get, invokeMap, map, pick } from 'lodash';

import { DataVariable, Project, RecordSet, RecordStream } from '../../interfaces';
import { ObjectFactory, ObjectFactoryRegistry } from '../object-factory';
import { DefaultDataVariable, DefaultDataVariableArg } from './default-data-variable';

export type DefaultRecordSetArg =
  Pick<RecordSet, 'id' | 'label' | 'labelPlural'> &
  Partial<Pick<RecordSet, 'description'>> &
  { defaultRecordStream: string, dataVariables: DefaultDataVariableArg[] } &
  Partial<{ parent: string }>;

export class DefaultRecordSet implements RecordSet {
  id: string;
  label: string;
  labelPlural: string;
  parent: RecordSet;
  description: string;
  defaultRecordStream: RecordStream;
  dataVariables: DataVariable[];

  private parentString: string;

  constructor(data: DefaultRecordSetArg, project: Project) {
    Object.assign(this, data, {
      parent: undefined,
      parentString: data.parent,
      defaultRecordStream: project.getRecordStream(data.defaultRecordStream),
      dataVariables: map(data.dataVariables, arg => new DefaultDataVariable(arg, this))
    });
  }

  resolveParent(recordSets: RecordSet[]): void {
    if (this.parentString && recordSets) {
      this.parent = find(recordSets, ['id', this.parentString]);
      this.parentString = undefined;
    }
  }

  toJSON(): any {
    return Object.assign(pick(this, ['id', 'label', 'labelPlural', 'description']), {
      parent: get(this.parent, 'id'),
      defaultRecordStream: get(this.defaultRecordStream, 'id'),
      dataVariables: invokeMap(this.dataVariables, 'toJSON')
    });
  }
}

export class DefaultRecordSetFactory implements ObjectFactory<RecordSet, Project> {
  id = 'default';
  type = 'recordSet';

  fromJSON(data: any, context: Project, _registry: ObjectFactoryRegistry): RecordSet {
    return new DefaultRecordSet(data, context);
  }

  toJSON(instance: RecordSet, _context: Project, _registry: ObjectFactoryRegistry): any {
    return instance.toJSON();
  }
}
