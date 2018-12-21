import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { select, Store } from '@ngrx/store';

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
  graphicSymbolOptions: GraphicSymbolOption[] = [];
  recordStreams: RecordStream[];
  selectedRecordStream: Map<string, RecordStream>;
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
        this.selectedRecordStream = new Map();
        this.graphicSymbolOptions = this.activeVis.data.graphicSymbolOptions;

        if (this.mode === 'edit') {
          this.setRecordStreams();
        }
      }

      if ('mode' in changes && this.mode === 'edit') {
        if (this.activeVis && this.activeVis.data) {
          this.setRecordStreams();
        }
      }
    }
  }

  setRecordStreams() {
    Object.keys(this.activeVis.data.graphicSymbols).forEach((gso) => {
      this.selectedRecordStream.set(gso, this.activeVis.data.graphicSymbols[gso].recordStream);
    });
  }

  recordStreamDropped(recordStream: RecordStream, graphicSymbolOption: GraphicSymbolOption) {
    this.selectedRecordStream.set(graphicSymbolOption.id, recordStream);
    this.updateService.updateGraphicSymbol(this.activeVis.data, graphicSymbolOption.id, graphicSymbolOption.type, recordStream);
  }

  unsetRecordStream(graphicSymbolOptionId: string) {
    this.updateService.unsetRecordStream(graphicSymbolOptionId, this.activeVis.data);
    this.selectedRecordStream.delete(graphicSymbolOptionId);
  }

  onDragDropEvent(event: DragDropEvent) {
    if (event.type === 'drag-start') {
      this.selectionClass = event.accepted ? 'selectable' : 'unselectable'; // 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)';
    } else if (event.type === 'drag-end') {
      this.selectionClass = '';
    }
  }
}
