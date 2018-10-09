import { RawData } from '../../shared/raw-data';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';

export class ActivityLogRawData implements RawData {
  template = 'activityLog';
  public saveActivityLog = true;
  private db: any /* nSQL */;

  constructor(public id: string, data = null) {
    this.setupDB(data);
    console.log('raw');
  }

  // TODO
  private setupDB(data: any) {
    // clear old data/indexeddb
    // this.db = nSQL()...

    if (data && data.activityLog) {
      // insert data from activityLog
    }
  }

  // TODO
  public async logActivity(log: any): Promise<any> {
    // this.db.query('upsert', log).then();
  }

  async getData(): Promise<any> {
    if (this.saveActivityLog) {
      return {activityLog: []};
    } else {
      return {activityLog: [] /* TODO: await this.db.query('select').exec();*/};
    }
  }
  async toJSON(): Promise<any> {
    return Object.assign({id: this.id, template: this.template, data: await this.getData()});
  }
}

export class ActivityLogRawDataFactory implements ObjectFactory<RawData, Project> {
  id = 'activityLog';
  type = 'rawData';

  fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): RawData | Promise<RawData> {
    return new ActivityLogRawData(data.id, data.data);
  }
  async toJSON(instance: RawData, context: Project, registry: ObjectFactoryRegistry): Promise<any> {
    return instance.toJSON();
  }
}
