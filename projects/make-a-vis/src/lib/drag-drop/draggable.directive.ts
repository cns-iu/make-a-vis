import { Directive, HostBinding, HostListener, Input } from '@angular/core';

import { DragDropService } from './drag-drop.service';

@Directive({
  selector: '[mavDraggable]'
})
export class DraggableDirective {
  private emitEndEventOnMouseOut = true;

  @Input() mavDraggable: any; // Data
  @Input() zone = 'any-zone';
  @Input() dropEffect = 'copy';

  constructor(private service: DragDropService) { }

  @HostBinding()
  get draggable(): boolean {
    return true;
  }

  @HostListener('mouseover', [])
  onMouseOver(): void {
    this.emitEndEventOnMouseOut = true;
    this.service.startDrag(this.zone, this.mavDraggable);
  }

  @HostListener('mouseout', [])
  onMouseOut(): void {
    if (this.emitEndEventOnMouseOut) {
      this.service.endDrag(this.zone, this.mavDraggable, true);
    }
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    this.emitEndEventOnMouseOut = false;
    event.dataTransfer.effectAllowed = this.dropEffect;
    event.dataTransfer.setData('text/plain', 'Useless Data');
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event: DragEvent): void {
    this.service.endDrag(this.zone, this.mavDraggable,
      event.dataTransfer.dropEffect === 'none');
  }
}
