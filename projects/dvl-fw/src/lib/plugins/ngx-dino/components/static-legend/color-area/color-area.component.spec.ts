import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorAreaComponent } from './color-area.component';

describe('ColorAreaComponent', () => {
  let component: ColorAreaComponent;
  let fixture: ComponentFixture<ColorAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
