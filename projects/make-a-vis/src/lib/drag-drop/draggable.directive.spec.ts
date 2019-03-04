import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MockRender } from 'ng-mocks';

import { DragDropService } from './drag-drop.service';
import { DraggableDirective } from './draggable.directive';

describe('DraggableDirective', () => {
  let directive: DraggableDirective;
  let fixture: ComponentFixture<void>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DraggableDirective],
      providers: [DragDropService]
    });
  });

  beforeEach(() => {
    fixture = MockRender(`<div mavDraggable></div>`);
    directive = fixture.debugElement.query(By.directive(DraggableDirective)).componentInstance;
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
