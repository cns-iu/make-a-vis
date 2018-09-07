import { GraphicVariable } from './graphic-variable';
import { GraphicSymbol } from './graphic-symbol';
import { DataSource } from './data-source';
import { RecordStream } from './record-stream';
import { RecordSet } from './record-set';
import { Visualization } from './visualization';
import { RawData } from './raw-data';


export interface Project {
  apiVersion: string;
  metadata: any;
  dataSources: DataSource[];
  recordSets: RecordSet[];
  graphicVariables: GraphicVariable[];
  graphicSymbols: GraphicSymbol[];
  visualizations: Visualization[];
  rawData: RawData[];
  plugins: any[];

  getRecordStream<T>(id: string): RecordStream<T>;
  findObjects<T>(data: T[], search: { [key: string]: any}): T[];
}
