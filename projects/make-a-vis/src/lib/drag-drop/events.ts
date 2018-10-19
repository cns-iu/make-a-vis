export interface DragStartEvent {
  type: 'drag-start';
  zone: string;
  data: any;
  accepted?: boolean;
}

export interface DragEndEvent {
  type: 'drag-end';
  zone: string;
  data: any;
  canceled: boolean;
}

export type DragDropEvent = DragStartEvent | DragEndEvent;
