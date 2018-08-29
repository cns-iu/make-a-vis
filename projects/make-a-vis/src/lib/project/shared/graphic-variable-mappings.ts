import { RecordStream } from './record-stream';
import { GraphicVariable } from './graphic-variable';

export interface GraphicVariableMapping {
  recordStream: RecordStream;
  mappings: {
    [recordSetId: string]: {
      [dataVariableId: string]: {
        [graphicVariableType: string]: GraphicVariable;
      }
    }
  };
}
