import { TestBed } from '@angular/core/testing';

import { DragDropService } from './drag-drop.service';
import { DroppableDirective } from './droppable.directive';

describe('DroppableDirective', () => {

  let directive: DroppableDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DragDropService]
    });
  });

  beforeEach(() => {
    directive = TestBed.get(DroppableDirective);
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
