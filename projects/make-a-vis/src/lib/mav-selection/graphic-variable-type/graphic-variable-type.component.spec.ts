import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicVariableTypeComponent } from './graphic-variable-type.component';

describe('GraphicVariableTypeComponent', () => {
  let component: GraphicVariableTypeComponent;
  let fixture: ComponentFixture<GraphicVariableTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicVariableTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicVariableTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
