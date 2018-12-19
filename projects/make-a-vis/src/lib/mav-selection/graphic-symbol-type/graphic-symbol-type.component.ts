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
  selectedRecordStream: RecordStream;
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
        this.graphicSymbolOptions = this.activeVis.data.graphicSymbolOptions;
      }
    }
  }

  recordStreamDropped(recordStream: RecordStream, graphicSymbolOption: GraphicSymbolOption) {
    this.selectedRecordStream = recordStream;
    this.updateService.updateGraphicSymbol(this.activeVis.data, graphicSymbolOption.id, graphicSymbolOption.type, recordStream);
  }

  onDragDropEvent(event: DragDropEvent) {
    if (event.type === 'drag-start') {
      this.selectionClass = event.accepted ? 'selectable' : 'unselectable'; // 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)';
    } else if (event.type === 'drag-end') {
      this.selectionClass = '';
    }
  }
}
