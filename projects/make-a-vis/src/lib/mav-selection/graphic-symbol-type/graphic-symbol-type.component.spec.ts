import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicSymbolTypeComponent } from './graphic-symbol-type.component';
import { MockComponent, MockComponents } from 'ng-mocks';
import { MatIcon, MatCard } from '@angular/material';

describe('GraphicSymbolTypeComponent', () => {
  let component: GraphicSymbolTypeComponent;
  let fixture: ComponentFixture<GraphicSymbolTypeComponent>;
  const mockComponents = MockComponents(
      MatIcon,
      MatCard
  );

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicSymbolTypeComponent ].concat(mockComponents)
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicSymbolTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
