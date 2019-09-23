import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BoundLegendComponent } from '@ngx-dino/legend';
import { MockComponent } from 'ng-mocks';

import { EndComponent } from './end.component';

describe('EndComponent', () => {
  let component: EndComponent;
  let fixture: ComponentFixture<EndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndComponent, MockComponent(BoundLegendComponent) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
