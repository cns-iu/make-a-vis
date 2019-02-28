import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphicVariableIconComponent } from './graphic-variable-icon.component';

describe('GraphicVariableIconComponent', () => {
  let component: GraphicVariableIconComponent;
  let fixture: ComponentFixture<GraphicVariableIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphicVariableIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphicVariableIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
