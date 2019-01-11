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
  parent: RecordSet;
  description: string;
  defaultRecordStream: RecordStream;
  dataVariables: DataVariable[];

  private parentString: string;

  constructor(data: {id: string, label: string, labelPlural: string,
      parent?: string, description?: string, defaultRecordStream: string, dataVariables: any[]}, project: Project) {
    const defaultRecordStream = project.getRecordStream(data.defaultRecordStream);
    const dataVariables = data.dataVariables.map(d => new DefaultDataVariable(d, this));
    if (data.parent) {
      this.parentString = data.parent;
      data.parent = undefined;
    }
    Object.assign(this, data, { dataVariables, defaultRecordStream });
  }

  resolveParent(recordSets: RecordSet[]) {
    if (this.parentString && recordSets) {
      this.parent = recordSets.find(rs => rs.id === this.parentString);
      this.parentString = undefined;
    }
  }

  toJSON(): any {
    const dataVariables = this.dataVariables.map(d => d.toJSON());
    const defaultRecordStream = this.defaultRecordStream ? this.defaultRecordStream.id : undefined;
    const parent = this.parent ? this.parent.id : undefined;
    return Object.assign({}, this, { parent, dataVariables, defaultRecordStream });
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
