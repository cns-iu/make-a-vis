import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TemporalBargraphComponent as NgxTemporalBargraphComponent } from '@ngx-dino/temporal-bargraph';
import { MockComponent } from 'ng-mocks';

import { TemporalBargraphComponent } from './temporal-bargraph.component';

describe('TemporalBargraphComponent', () => {
  let component: TemporalBargraphComponent;
  let fixture: ComponentFixture<TemporalBargraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemporalBargraphComponent, MockComponent(NgxTemporalBargraphComponent) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemporalBargraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
