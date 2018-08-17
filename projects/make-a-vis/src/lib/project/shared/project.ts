import { DataSource } from './data-source';
import { RecordStream } from './record-stream';
import { RecordSet } from './record-set';
import { Visualization } from './visualization';

export class Project {
  apiVersion = '1';

  constructor(
    public metadata: any = { dateCreated: new Date() },
    public dataSources: Map<string, DataSource> = new Map(),
    public recordStreams: Map<string, RecordStream<any>> = new Map(),
    public recordSets: Map<string, RecordSet<any>> = new Map(),
    public visualizations: Map<string, Visualization> = new Map()
  ) { }

  getRecordStream<T>(id: string): RecordStream<T> {
    const results: RecordStream<T>[] = [];
    this.dataSources.forEach((dataSource) => {
      if (dataSource.streams.has(id)) {
        results.push(dataSource.streams.get(id));
      }
    });
    return results.length > 0 ? results[0] : null;
  }
}
