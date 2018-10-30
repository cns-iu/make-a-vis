// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { DataVariable } from '../../shared/data-variable';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';
import { RecordSet } from '../../shared/record-set';
import { RecordStream } from '../../shared/record-stream';
import { DefaultDataVariable } from './default-data-variable';


export class DefaultRecordSet implements RecordSet {
  id: string;
  label: string;
  labelPlural: string;
  defaultRecordStream: RecordStream;
  dataVariables: DataVariable[];

  constructor(data: {id: string, label: string, labelPlural: string, defaultRecordStream: string, dataVariables: any[]}, project: Project) {
    const dataVariables = data.dataVariables.map(d => new DefaultDataVariable(d));
    const defaultRecordStream = project.getRecordStream(data.defaultRecordStream);
    Object.assign(this, data, { dataVariables, defaultRecordStream });
  }
  toJSON(): any {
    const dataVariables = this.dataVariables.map(d => d.toJSON());
    const defaultRecordStream = this.defaultRecordStream ? this.defaultRecordStream.id : undefined;
    return Object.assign({}, this, { dataVariables, defaultRecordStream });
  }
}

export class DefaultRecordSetFactory implements ObjectFactory<RecordSet, Project> {
  id = 'default';
  type = 'recordSet';

  fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): RecordSet {
    return new DefaultRecordSet(data, context);
  }
  toJSON(instance: RecordSet, context: Project, registry: ObjectFactoryRegistry) {
    return instance.toJSON();
  }
}
