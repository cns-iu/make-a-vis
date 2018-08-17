import { Project } from './../shared/project';
import { DataSource } from './../shared/data-source';
import { RecordStream } from './../shared/record-stream';


export class ISIDataSource implements DataSource {
  template: 'isi';
  streams: Map<string, RecordStream<any>>;
  properties: Map<string, any>;

  constructor(public id: string) {

  }

  static fromJSON(data: any): ISIDataSource {
    return null;
  }
  toJSON(): any {
    return null;
  }
}

export class ISITemplateProjectFactory {
  static create(isiFileContent: string): Project {
    return null;
  }
}
export class ISITemplateProject extends Project {
  constructor(isiFileContent: string) {
    super();
  }
}
