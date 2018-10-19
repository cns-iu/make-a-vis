import {
  Component,
  OnInit,
  Input, Output,
  HostListener,
  EventEmitter
} from '@angular/core';

import { DataVariableHoverService } from '../../shared/services/hover/data-variable-hover.service';

import { DataVariable, GraphicSymbolOption, RecordStream, Project, GraphicVariable } from 'dvl-fw';

@Component({
  selector: 'mav-data-variable-dropzone',
  templateUrl: './data-variable-dropzone.component.html',
  styleUrls: ['./data-variable-dropzone.component.css']
})
export class DataVariableDropzoneComponent implements OnInit {
  selectionClass = '';

  @Input() graphicSymbolOption: GraphicSymbolOption;
  @Input() availableGraphicVariables: GraphicVariable[];

  @Input() recordStream: RecordStream;
  @Input() selectedDataVariable: DataVariable;
  @Output() selectedDataVariableChange = new EventEmitter<DataVariable>();

  @Input() graphicVariable: GraphicVariable;
  @Output() graphicVariableChange = new EventEmitter<GraphicVariable>();

  constructor(private hoverService: DataVariableHoverService) { }

  ngOnInit() { }

  dataVariableDropped(selectedDataVariable: DataVariable) {
    this.selectedDataVariable = selectedDataVariable;
    this.selectedDataVariableChange.emit(this.selectedDataVariable);

    this.graphicVariable = this.mappableGraphicVariables(selectedDataVariable)[0];
    this.graphicVariableChange.emit(this.graphicVariable);
  }

  onDragDropEvent(event: any) {
    if (event.type === 'drag-start') {
      this.selectionClass = event.accepted ? 'selectable' : 'unselectable'; // 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)';
    } else if (event.type === 'drag-end') {
      this.selectionClass = '';
    }
  }

  @HostListener('mouseover', [])
  onMouseOver() {
    this.hoverService.startHover([this.graphicSymbolOption.type]);
  }

  @HostListener('mouseout', [])
  onMouseOut() {
    this.hoverService.endHover();
  }

  mappableGraphicVariables(dataVariable: DataVariable): GraphicVariable[] {
    return this.availableGraphicVariables.filter(gv =>
      gv.recordStream === this.recordStream
      && gv.dataVariable === dataVariable
      && gv.type === this.graphicSymbolOption.type
    );
  }

  get acceptsDrop() {
    return (dataVariable: DataVariable) => {
      return this.mappableGraphicVariables(dataVariable).length > 0;
    };
  }
}
