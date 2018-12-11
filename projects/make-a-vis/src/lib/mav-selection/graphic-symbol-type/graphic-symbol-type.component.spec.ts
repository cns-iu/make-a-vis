import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicSymbolTypeComponent } from './graphic-symbol-type.component';

describe('GraphicSymbolTypeComponent', () => {
  let component: GraphicSymbolTypeComponent;
  let fixture: ComponentFixture<GraphicSymbolTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicSymbolTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicSymbolTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
