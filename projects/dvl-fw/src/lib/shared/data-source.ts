// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { deflate, inflate } from 'pako';

import { RecordStream } from './record-stream';


export interface DataSourceOptions {
  rawData?: string;
}

export interface DataSource {
  id: string;
  template: string;
  properties: DataSourceOptions;
  recordStreams: RecordStream[];

  toJSON(): any;
}

export class DataSourceUtils {
  static compressFile(fileContents: string): string {
    return deflate(fileContents, { to: 'string' });
  }
  static decompressFile(compressedContents: string): string {
    return inflate(compressedContents, { to: 'string' });
  }
}
