import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeSizeComponent } from './node-size.component';

describe('NodeSizeComponent', () => {
  let component: NodeSizeComponent;
  let fixture: ComponentFixture<NodeSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeSizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
