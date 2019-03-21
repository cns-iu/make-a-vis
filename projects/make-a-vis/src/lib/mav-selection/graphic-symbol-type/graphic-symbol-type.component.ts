import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { GraphicSymbolOption, RecordStream } from '@dvl-fw/core';
import { select, Store } from '@ngrx/store';
import { capitalize as loCapitalize } from 'lodash';

import { DataService } from '../../data-view/shared/data.service';
import { DragDropEvent } from '../../drag-drop';
import { UpdateVisService } from '../../shared/services/update-vis/update-vis.service';
import { ModeType, Vis } from '../../shared/types';
import { getRecordStreamsSelector, SidenavState } from '../../toolbar/shared/store';

/**
 * Heirarchical record stream type for showing parent-child relationships between record-streams
 */
interface HeirarchicalRecordStream {
  recordStream: RecordStream;
  level: number;
}


/**
 * mav-selection-graphic-symbol-type component declaration, responsible for showing graphic-symbol selection options in mav-selection
 */
@Component({
  selector: 'mav-selection-graphic-symbol-type',
  templateUrl: './graphic-symbol-type.component.html',
  styleUrls: ['./graphic-symbol-type.component.scss']
})
export class GraphicSymbolTypeComponent implements OnChanges {
  /**
   * Input of active visualization
   */
  @Input() activeVis: Vis;
  /**
   * Input of mode - add/edit
   */
  @Input() mode: ModeType;
  /**
   * Output event-emitter of selected record-stream mapping i.e. Map<graphic-symbol-option-id, RecordStream>
   */
  @Output() recordStreamChange = new EventEmitter<Map<string, RecordStream>>();
  /**
   * Available graphic symbol options
   */
  graphicSymbolOptions: GraphicSymbolOption[] = [];
  /**
   * Available heirarchical record streams
   */
  heirarchicalRecordStreams: HeirarchicalRecordStream[] = [];
  /**
   * Mapping of selected record streams i.e. Map<graphic-symbol-option-id, RecordStream>
   */
  selectedRecordStreamMapping: Map<string, RecordStream>;
  /**
   * css class to be applied to selectable record-streams
   */
  selectionClass = '';

  /**
   * Creates an instance of graphic symbol type component.
   * @param updateService instance of UpdateVisService
   * @param store instance of Store
   * @param dataService instance of DataService
   */
  constructor(private updateService: UpdateVisService, private store: Store<SidenavState>, private dataService: DataService) {
    this.store.pipe(select(getRecordStreamsSelector)).subscribe((recordStreams: RecordStream[]) => {
      const heirarchicalRecordStreams: HeirarchicalRecordStream[] = [];
      if (recordStreams) {
        recordStreams.forEach((record) => {
          const dataScource = dataService.dataSources.find(dataSource => dataSource.streamId === record.id);
          if (dataScource) {
            const heirarchicalRecordStream = {
              recordStream: record,
              level: dataScource.level
            };
            heirarchicalRecordStreams.push(heirarchicalRecordStream);
          }
        });
      }
      this.heirarchicalRecordStreams = heirarchicalRecordStreams;
    });
  }

  /**
   * on changes life-cycle hook for this component
   * @param changes The changed properties object
   */
  ngOnChanges(changes: SimpleChanges) {
    if ('activeVis' in changes) {
      if (this.activeVis && this.activeVis.data) {
        this.selectedRecordStreamMapping = new Map();
        this.graphicSymbolOptions = this.activeVis.data.graphicSymbolOptions;

        if (this.mode === 'edit') {
          this.setRecordStreams();
        }
      }
    }

    if ('mode' in changes && this.mode === 'edit') {
      if (this.activeVis && this.activeVis.data) {
        this.setRecordStreams();
      } else {
        this.clear();
      }
    }
  }

  /**
   * Sets record streams and makes mappings in edit mode
   */
  setRecordStreams() {
    Object.keys(this.activeVis.data.graphicSymbols).forEach((gso) => {
      this.selectedRecordStreamMapping.set(gso, this.activeVis.data.graphicSymbols[gso].recordStream);
    });
    this.recordStreamChange.emit(this.selectedRecordStreamMapping);
  }

  /**
   * Callback for when records stream is dropped
   * @param recordStream dropped record-stream
   * @param graphicSymbolOption graphic-symbol-option on which the record-stream was dropped
   */
  recordStreamDropped(recordStream: RecordStream, graphicSymbolOption: GraphicSymbolOption) {
    this.updateService.updateGraphicSymbol(this.activeVis.data, graphicSymbolOption.id, graphicSymbolOption.type, recordStream);
    this.selectedRecordStreamMapping.set(graphicSymbolOption.id, recordStream);
    this.recordStreamChange.emit(this.selectedRecordStreamMapping);
  }

  /**
   * Unsets record stream when the cancel button is clicked
   * @param graphicSymbolOptionId id of the graphic-symbol-option whose record-stream is unset
   */
  unsetRecordStream(graphicSymbolOptionId: string) {
    this.updateService.unsetRecordStream(graphicSymbolOptionId, this.activeVis.data);
    this.selectedRecordStreamMapping.delete(graphicSymbolOptionId);
    this.recordStreamChange.emit(this.selectedRecordStreamMapping);
  }

  /**
   * Clears global variables in graphic symbol type component
   */
  clear() {
    // clear record-streams
    this.heirarchicalRecordStreams = [];

    // clear mapping
    if (this.selectedRecordStreamMapping && this.selectedRecordStreamMapping.size) {
      this.selectedRecordStreamMapping.clear();
      this.recordStreamChange.emit(this.selectedRecordStreamMapping);
    }

    // clear graphic-symbol-options and selectionClass
    this.graphicSymbolOptions = [];
    this.selectionClass = '';
  }

  /**
   * Callback for when any drag-drop event takes place
   * @param event instance of DragDropEvent
   */
  onDragDropEvent(event: DragDropEvent) {
    if (event.type === 'drag-start') {
      this.selectionClass = event.accepted ? 'selectable' : 'unselectable'; // 'rgba(0,255,0,0.1)' : 'rgba(255,0,0,0.1)';
    } else if (event.type === 'drag-end') {
      this.selectionClass = '';
    }
  }

  /**
   * Wrapper for lodash's capitalize in sentence case
   * @param text provided string
   * @returns capitalized string
   */
  capitalize(text: string): string {
    return loCapitalize(text);
  }
}
