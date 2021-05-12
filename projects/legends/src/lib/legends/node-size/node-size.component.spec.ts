import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AreaSizeLegendComponent } from '@ngx-dino/legend';
import { MockComponent } from 'ng-mocks';

import { NodeSizeComponent } from './node-size.component';

describe('NodeSizeComponent', () => {
  let component: NodeSizeComponent;
  let fixture: ComponentFixture<NodeSizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NodeSizeComponent, MockComponent(AreaSizeLegendComponent) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
