import { RecordStream } from './record-stream';
import { GraphicVariable } from './graphic-variable';

export interface GraphicSymbol {
  id: string;
  type: string;
  recordStream: RecordStream;
  graphicVariables: Map<string, GraphicVariable>;
}
