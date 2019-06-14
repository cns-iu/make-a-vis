import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { XAxisComponent } from './x-axis.component';

describe('XAxisComponent', () => {
  let component: XAxisComponent;
  let fixture: ComponentFixture<XAxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ XAxisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
