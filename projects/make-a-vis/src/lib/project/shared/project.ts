import { GraphicVariableMapping } from './graphic-variable-mapping';
import { DataSource } from './data-source';
import { RecordStream } from './record-stream';
import { RecordSet } from './record-set';
import { Visualization } from './visualization';

export class Project {
  apiVersion = '1';

  constructor(
    public metadata: any = { dateCreated: new Date() },
    public dataSources: DataSource[] = [],
    public recordSets: RecordSet[] = [],
    public graphicVariableMappings: GraphicVariableMapping[] = [],
    public visualizations: Visualization[] = [],
    public rawData: { [id: string]: any } = {}
  ) { }

  getRecordStream<T>(id: string): RecordStream<T> {
    for (const dataSource of this.dataSources) {
      for (const stream of dataSource.recordStreams) {
        if (stream.id === id) {
          return stream;
        }
      }
    }
    return null;
  }
}
