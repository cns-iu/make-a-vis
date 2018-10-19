import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DragDropEvent, DragEndEvent, DragStartEvent } from './events';

@Injectable({
  providedIn: 'root'
})
export class DragDropService {
  public readonly events: Observable<DragDropEvent> = new EventEmitter();
  public currentItem: any;

  constructor() { }

  startDrag(zone: string, data: any, accepted: boolean = false): void {
    const event: DragStartEvent = {
      type: 'drag-start', zone, data, accepted
    };

    this.currentItem = data;
    this.asEventEmitter().emit(event);
  }

  endDrag(zone: string, data: any, canceled: boolean = false): void {
    const event: DragEndEvent = {
      type: 'drag-end', zone, data, canceled
    };

    this.asEventEmitter().emit(event);
  }

  private asEventEmitter(): EventEmitter<DragDropEvent> {
    return this.events as EventEmitter<DragDropEvent>;
  }
}
