import { Project } from './../shared/project';
import { DataSource } from './../shared/data-source';
import { RecordStream } from './../shared/record-stream';


export class NSFDataSource implements DataSource {
  template: 'nsf';
  streams: Map<string, RecordStream<any>>;
  properties: Map<string, any>;

  constructor(public id: string) {

  }

  static fromJSON(data: any): NSFDataSource {
    return null;
  }
  toJSON(): any {
    return null;
  }
}

export class NSFTemplateProjectFactory {
  static create(nsfFileContent: string): Project {
    return null;
  }
}
export class NSFTemplateProject extends Project {
  constructor(nsfFileContent: string) {
    super();
  }
}
