import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScatterplotComponent as NgxScatterplotComponent } from '@ngx-dino/scatterplot';
import { MockComponent } from 'ng-mocks';

import { ScatterplotComponent } from './scatterplot.component';

describe('ScatterplotComponent', () => {
  let component: ScatterplotComponent;
  let fixture: ComponentFixture<ScatterplotComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScatterplotComponent, MockComponent(NgxScatterplotComponent) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScatterplotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
