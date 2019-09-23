import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StrokeWidthLegendComponent } from '@ngx-dino/legend';
import { MockComponent } from 'ng-mocks';

import { EdgeSizeComponent } from './edge-size.component';

describe('EdgeSizeComponent', () => {
  let component: EdgeSizeComponent;
  let fixture: ComponentFixture<EdgeSizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdgeSizeComponent, MockComponent(StrokeWidthLegendComponent) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdgeSizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
