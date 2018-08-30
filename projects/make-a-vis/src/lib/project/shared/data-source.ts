import { deflate, inflate } from 'pako';
import { RecordStream } from './record-stream';


export interface DataSourceOptions {
  dataURL?: string;
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
