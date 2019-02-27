// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Component, EventEmitter, HostListener, Input, Output} from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DataVariable,  GraphicVariable, GraphicVariableOption, RecordStream } from '@dvl-fw/core';
import { DragDropEvent } from '../../drag-drop';
import { ApplicationState, getLoadedProject } from '../../shared/store';
import { DataVariableHoverService } from '../../shared/services/hover/data-variable-hover.service';

@Component({
  selector: 'mav-data-variable-dropzone',
  templateUrl: './data-variable-dropzone.component.html',
  styleUrls: ['./data-variable-dropzone.component.scss']
})
export class DataVariableDropzoneComponent {
  @Input() recordStream: RecordStream;
  @Input() graphicVariableOption: GraphicVariableOption;
  @Output() graphicVariableChange: Observable<GraphicVariable>;

  selectionClass = '';

  private availableGraphicVariables: GraphicVariable[] = [];
  private _graphicVariableChange = new EventEmitter<GraphicVariable>();

  constructor(
    store: Store<ApplicationState>,
    private hoverService: DataVariableHoverService
  ) {
    this.graphicVariableChange = this._graphicVariableChange.asObservable();

    store.pipe(
      select(getLoadedProject),
      map(project => project && project.graphicVariables || [])
    ).subscribe(gvs => this.availableGraphicVariables = gvs);
  }

  dataVariableDropped(selectedDataVariable: DataVariable) {
    const gvs = this.mappableGraphicVariables(selectedDataVariable);
    this._graphicVariableChange.emit(gvs[0]);
  }

  onDragDropEvent(event: DragDropEvent) {
    if (event.type === 'drag-start') {
      this.selectionClass = event.accepted ? 'selectable' : 'unselectable'; // 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)';
    } else if (event.type === 'drag-end') {
      this.selectionClass = '';
    }
  }

  @HostListener('mouseover', [])
  onMouseOver() {
    this.hoverService.startHover([this.graphicVariableOption.type]);
  }

  @HostListener('mouseout', [])
  onMouseOut() {
    this.hoverService.endHover();
  }

  mappableGraphicVariables(dataVariable: DataVariable): GraphicVariable[] {
    return this.availableGraphicVariables.filter(gv =>
      gv.recordStream === this.recordStream
      && gv.dataVariable === dataVariable
      && gv.type === this.graphicVariableOption.type
    );
  }

  get acceptsDrop() {
    return (dataVariable: DataVariable) => {
      return this.mappableGraphicVariables(dataVariable).length > 0;
    };
  }
}
