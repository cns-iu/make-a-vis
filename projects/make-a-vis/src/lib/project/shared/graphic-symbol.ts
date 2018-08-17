import { RecordStream } from './record-stream';
import { GraphicVariable } from './graphic-variable';

export class GraphicSymbol {
  id: string;
  recordStream: RecordStream<any>;
  type: string;
  graphicVariables: Map<string, GraphicVariable>;
}
