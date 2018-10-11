import { RawData } from '../../shared/raw-data';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';
import { nSQL } from 'nano-sql';

import { CategoryLogMessage } from 'typescript-logging';
import {  get } from 'lodash';
import { async } from 'q';


export class ActivityLogRawData implements RawData {
  template = 'activityLog';
  public saveActivityLog = false;
  private db: any /* nSQL */;

  constructor(public id: string, data = null) {
    this.setupDB(data);
    console.log('raw');
  }

  // TODO
  private setupDB(data: any) {
    // clear old data/indexeddb
    nSQL('activitylog')
    .model([
      {key: 'logid', type: 'int', props: ['pk', 'ai']}, // pk == primary key, ai == auto incriment
      {key: 'actionname', type: 'string'},
      {key: 'filename', type: 'string'},
      {key: 'fileextension', type: 'string'},
      {key: 'date', type: 'string'}
    ]).actions([{
          name: 'add_new_log',
          args: ['activitylog:map'],
          call: function(args, db) {
            console.log('inserting data');
            console.log(args);
            return db.query('upsert', args.activitylog).exec();
          }
      }
    ]).connect()
    .then(() => {
      console.log('data connection successful');

    });

    console.log('data is ');
    console.log(data);
    if (data && data.activityLog) {

      nSQL().loadJS('activitylog', data.activityLog).then(() => {
        console.log('inserted activity log from new loaded file to nano table');
      });

      console.log('the log data is');
      console.log(data.activityLog);
      // insert data from activityLog
    }
  }

  // TODO
  public async logActivity(msg: CategoryLogMessage): Promise<any> {
    console.log('log activity');
    console.log(msg.logData);

      nSQL('activitylog').doAction('add_new_log', {
        activitylog: {
        id: null,
        actionname: get(msg, 'logData.data.type'),
        filename: get(msg, 'logData.data.payload.filename'),
        fileextension: get(msg, 'logData.data.payload.fileExtension'),
        date : new Date().toLocaleDateString()
        }
      }).then((result) => {
        console.log('log activity successful');
        console.log(result);
      });

  }

  async getData(): Promise<any> {
    console.log('save data called');
    if (this.saveActivityLog) {
      return {activityLog: []};
    } else {
     return nSQL('activitylog').query('select').exec().then((rows) => {
        console.log(rows);
        return {activityLog: rows};
      });
    }
  }
  async toJSON(): Promise<any> {
    // return Object.assign({id: this.id, template: this.template, data: 'Jassi'});
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
