// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { extend, get, map, omit } from 'lodash';
import { NanoSQLInstance, nSQL } from 'nano-sql';
import { CategoryLogMessage } from 'typescript-logging';

import { ObjectFactory, ObjectFactoryRegistry } from '../../shared/object-factory';
import { Project } from '../../shared/project';
import { RawData } from '../../shared/raw-data';

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
        {key: 'date', type: 'string'},
        {key: 'payload', type: 'string' },
        {key: 'time', type: 'int'}
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
    (await ActivityLogRawData.db).doAction('add_new_log', {
      activitylog: {
      id: null,
      actionName: get(msg, 'logData.data.type'),
      date : new Date().toLocaleString(),
      time: new Date().getTime(),
      payload: JSON.stringify(omit(msg.logData.data.payload, ['project']))
      }
    });
  }

  async getData(): Promise<any> {
    if (this.saveActivityLog) {
      return (await ActivityLogRawData.db).query('select').exec().then((rows) => {
        rows = map(rows, (logItem) => {
          return extend(omit(logItem, ['payload']), JSON.parse(logItem['payload']));
        });
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
