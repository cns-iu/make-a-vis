import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BoundLegendComponent as NgxBoundComponent } from '@ngx-dino/legend';
import { MockComponent } from 'ng-mocks';

import { StartComponent } from './start.component';

describe('StartComponent', () => {
  let component: StartComponent;
  let fixture: ComponentFixture<StartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartComponent, MockComponent(NgxBoundComponent) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
