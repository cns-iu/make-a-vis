import { Component, EventEmitter, OnInit, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { capitalize as loCapitalize } from 'lodash';

import { GraphicSymbolOption, RecordStream } from '@dvl-fw/core';
import { DragDropEvent } from '../../drag-drop';
import { ModeType, Vis } from '../../shared/types';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';
import { getRecordStreamsSelector, SidenavState } from '../../toolbar/shared/store';


@Component({
  selector: 'mav-selection-graphic-symbol-type',
  templateUrl: './graphic-symbol-type.component.html',
  styleUrls: ['./graphic-symbol-type.component.sass']
})
export class GraphicSymbolTypeComponent implements OnInit, OnChanges {
  @Input() activeVis: Vis;
  @Input() mode: ModeType;
  @Output() recordStreamChange = new EventEmitter<Map<string, RecordStream>>();
  graphicSymbolOptions: GraphicSymbolOption[] = [];
  recordStreams: RecordStream[];
  selectedRecordStreamMapping: Map<string, RecordStream>;
  selectionClass = '';

  constructor(private updateService: UpdateVisService, private store: Store<SidenavState>) {
    this.store.pipe(select(getRecordStreamsSelector)).subscribe((recordStreams: RecordStream[]) => {
      this.recordStreams = recordStreams;
    });
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('activeVis' in changes) {
      if (this.activeVis && this.activeVis.data) {
        this.selectedRecordStreamMapping = new Map();
        this.graphicSymbolOptions = this.activeVis.data.graphicSymbolOptions;

        if (this.mode === 'edit') {
          this.setRecordStreams();
        }
      } else {
        this.clear();
      }

      if ('mode' in changes && this.mode === 'edit') {
        if (this.activeVis && this.activeVis.data) {
          this.setRecordStreams();
        } else {
          this.clear();
        }
      }
    }
  }

  setRecordStreams() {
    Object.keys(this.activeVis.data.graphicSymbols).forEach((gso) => {
      this.selectedRecordStreamMapping.set(gso, this.activeVis.data.graphicSymbols[gso].recordStream);
    });
    this.recordStreamChange.emit(this.selectedRecordStreamMapping);
  }

  recordStreamDropped(recordStream: RecordStream, graphicSymbolOption: GraphicSymbolOption) {
    this.updateService.updateGraphicSymbol(this.activeVis.data, graphicSymbolOption.id, graphicSymbolOption.type, recordStream);
    this.selectedRecordStreamMapping.set(graphicSymbolOption.id, recordStream);
    this.recordStreamChange.emit(this.selectedRecordStreamMapping);
  }

  unsetRecordStream(graphicSymbolOptionId: string) {
    this.updateService.unsetRecordStream(graphicSymbolOptionId, this.activeVis.data);
    this.selectedRecordStreamMapping.delete(graphicSymbolOptionId);
    this.recordStreamChange.emit(this.selectedRecordStreamMapping);
  }

  clear() {
    // clear record-streams
    this.recordStreams = [];

    // clear mapping
    if (this.selectedRecordStreamMapping && this.selectedRecordStreamMapping.size) {
      this.selectedRecordStreamMapping.clear();
      this.recordStreamChange.emit(this.selectedRecordStreamMapping);
    }

    // clear graphic-symbol-options and selectionClass
    this.graphicSymbolOptions = [];
    this.selectionClass = '';
  }

  onDragDropEvent(event: DragDropEvent) {
    if (event.type === 'drag-start') {
      this.selectionClass = event.accepted ? 'selectable' : 'unselectable'; // 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)';
    } else if (event.type === 'drag-end') {
      this.selectionClass = '';
    }
  }

  capitalize(text: string): string {
    return loCapitalize(text);
  }
}
