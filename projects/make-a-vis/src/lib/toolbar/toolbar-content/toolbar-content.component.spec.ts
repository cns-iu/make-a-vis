import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarContentComponent } from './toolbar-content.component';

describe('ToolbarContentComponent', () => {
  let component: ToolbarContentComponent;
  let fixture: ComponentFixture<ToolbarContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
