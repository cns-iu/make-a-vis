import { GraphicSymbol } from './../../shared/graphic-symbol';
import { GraphicVariable } from '../../shared/graphic-variable';
import { RecordStream } from '../../shared/record-stream';

import { DefaultGraphicVariable } from './default-graphic-variable-mapping';
import { Project } from '../../shared/project';

export class DefaultGraphicSymbol implements GraphicSymbol {
  id: string;
  type: string;
  recordStream: RecordStream;
  graphicVariables: { [id: string]: GraphicVariable; };

  constructor(data: any, private project: Project) {
    this.id = data.id;
    this.type = data.type;
    this.recordStream = project.getRecordStream(data.recordStream);
    this.graphicVariables = {};
    Object.entries(data.graphicVariables)
      .forEach(([id, gvar]) => this.graphicVariables[id] = new DefaultGraphicVariable(gvar));
  }


  toJSON(): any {
    return {
      id: this.id,
      type: this.type,
      recordStream: this.recordStream.id,
      graphicVariables: this.graphicVariables
    };
  }
}
