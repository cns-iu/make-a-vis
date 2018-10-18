import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DraggableDirective } from './draggable.directive';
import { DroppableDirective } from './droppable.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DraggableDirective, DroppableDirective],
  exports: [DraggableDirective, DroppableDirective]
})
export class DragDropModule { }
