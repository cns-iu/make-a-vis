import { Project } from './../../shared/project';
import { DataVariable } from './../../shared/data-variable';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { RecordSet } from '../../shared/record-set';
import { DefaultDataVariable } from './default-data-variable';


export class DefaultRecordSet implements RecordSet {
  id: string;
  label: string;
  labelPlural: string;
  dataVariables: DataVariable[];

  constructor(data: any) {
    const dataVariables = data.dataVariables.map(d => new DefaultDataVariable(d));
    Object.assign(this, data, { dataVariables });
  }
  toJSON(): any {
    const dataVariables = this.dataVariables.map(d => d.toJSON());
    return Object.assign({}, this, { dataVariables });
  }
}

export class DefaultRecordSetFactory implements ObjectFactory<RecordSet, Project> {
  id = 'default';
  type = 'recordSet';

  fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): RecordSet {
    return new DefaultRecordSet(data);
  }
  toJSON(instance: RecordSet, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
