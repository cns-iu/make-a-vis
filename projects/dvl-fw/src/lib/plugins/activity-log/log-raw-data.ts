import { RawData } from '../../shared/raw-data';
import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';

import { nSQL, NanoSQLInstance } from 'nano-sql';
import { CategoryLogMessage } from 'typescript-logging';
import {  get } from 'lodash';

export class ActivityLogRawData implements RawData {
  private static db: NanoSQLInstance | Promise<NanoSQLInstance> = null;
  template = 'activityLog';
  saveActivityLog = true;

  constructor(public id: string, data: any) {
    ActivityLogRawData.db = this.setupDB(data.data);
  }

  async setupDB(data: any): Promise<NanoSQLInstance> {
    if (ActivityLogRawData.db) {
      const db = (await ActivityLogRawData.db);
      await db.query('drop').exec();
    }

    await nSQL('activitylog')
      .model([
        {key: 'logid', type: 'int', props: ['pk', 'ai']}, // pk == primary key, ai == auto incriment
        {key: 'actionName', type: 'string'},
        {key: 'fileName', type: 'string'},
        {key: 'fileExtension', type: 'string'},
        {key: 'createdUrl', type: 'string'},
        {key: 'copiedUrl', type: 'string'},
        {key: 'visualizationId', type: 'string'},
        {key: 'slot', type: 'string'},
        {key: 'graphicSymbolId', type: 'string'},
        {key: 'visualizationNumber', type: 'number'},
        {key: 'date', type: 'string'}
      ]).actions([{
          name: 'add_new_log',
          args: ['activitylog:map'],
          call: function(args, database) {
            return database.query('upsert', args.activitylog).exec();
          }
        }
      ]).config({
        mode: 'TEMP'
      }).connect();

    if (data && data.activityLog) {
      await nSQL('activitylog').loadJS('activitylog', data.activityLog);
    }
    return ActivityLogRawData.db = nSQL('activitylog');
  }

  public async logActivity(msg: CategoryLogMessage): Promise<void> {
    console.log(msg);
    (await ActivityLogRawData.db).doAction('add_new_log', {
      activitylog: {
      id: null,
      actionName: get(msg, 'logData.data.type'),
      fileName: get(msg, 'logData.data.payload.fileName'),
      fileExtension: get(msg, 'logData.data.payload.fileExtension'),
      createdUrl: get(msg, 'logData.data.payload.shareUrl'),
      copiedUrl: get(msg, 'ng logData.data.payload.content'),
      visualizationId: get(msg, 'logData.data.payload.id'),
      graphicSymbolId: get(msg, 'logData.data.payload.symbol.recordStream.id'),
      slot: get(msg, 'logData.data.slot'),
      visualizationNumber: Number(get(msg, 'logData.data.payload')),
      date : new Date().toLocaleString()
      }
    });
  }

  async getData(): Promise<any> {

    if (this.saveActivityLog) {
      return (await ActivityLogRawData.db).query('select').exec().then((rows) => {
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

  async fromJSON(data: any, context: Project, registry: ObjectFactoryRegistry): Promise<RawData> {
    return new ActivityLogRawData(data.id, data);
  }
  async toJSON(instance: RawData, context: Project, registry: ObjectFactoryRegistry): Promise<any> {
    return instance.toJSON();
  }
}
