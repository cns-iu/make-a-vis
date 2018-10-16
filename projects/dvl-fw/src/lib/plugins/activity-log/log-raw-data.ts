import { RawData } from '../../shared/raw-data';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';
import { nSQL } from 'nano-sql';

import { CategoryLogMessage } from 'typescript-logging';
import {  get } from 'lodash';


export class ActivityLogRawData implements RawData {
  template = 'activityLog';
  public saveActivityLog = true;
  private db: any /* nSQL */;

  constructor(public id: string, data = null) {
    this.setupDB(data);
  }

  // TODO
  private setupDB(data: any) {
    // clear old data/indexeddb
    nSQL('activitylog')
    .model([
      {key: 'logid', type: 'int', props: ['pk', 'ai']}, // pk == primary key, ai == auto incriment
      {key: 'actionName', type: 'string'},
      {key: 'fileName', type: 'string'},
      {key: 'fileExtension', type: 'string'},
      {key: 'date', type: 'string'}
    ]).actions([{
          name: 'add_new_log',
          args: ['activitylog:map'],
          call: function(args, db) {
            return db.query('upsert', args.activitylog).exec();
          }
      }
    ]).config({
      mode: 'TEMP'
  }).connect();

    if (data && data.activityLog) {
      nSQL().loadJS('activitylog', data.activityLog);
    }
  }


  public async logActivity(msg: CategoryLogMessage): Promise<any> {

      nSQL('activitylog').doAction('add_new_log', {
        activitylog: {
        id: null,
        actionName: get(msg, 'logData.data.type'),
        fileName: get(msg, 'logData.data.payload.fileName'),
        fileExtension: get(msg, 'logData.data.payload.fileExtension'),
        date : new Date().toLocaleString()
        }
      });
  }

  async getData(): Promise<any> {
    console.log('save activity log');
    console.log(this.saveActivityLog);
    if (this.saveActivityLog) {
      return nSQL('activitylog').query('select').exec().then((rows) => {
        return {activityLog: rows};
      });
    } else {
      return {activityLog: []};
    }
  }
  async toJSON(): Promise<any> {
    const logData = await this.getData();
    return Object.assign({id: this.id, template: this.template, data: logData});
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
