// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { DataSource } from './data-source';
import { GraphicVariable } from './graphic-variable';
import { GraphicSymbol } from './graphic-symbol';
import { RawData } from './raw-data';
import { RecordSet } from './record-set';
import { RecordStream } from './record-stream';
import { Visualization } from './visualization';


export interface Project {
  apiVersion: string;
  metadata: any;
  dataSources: DataSource[];
  recordSets: RecordSet[];
  graphicVariables: GraphicVariable[];
  graphicSymbols: GraphicSymbol[];
  visualizations: Visualization[];
  rawData: RawData[];

  getRecordStream<T>(id: string): RecordStream<T>;
  findObjects<T>(data: T[], search: { [key: string]: any}): T[];
}
