import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScienceMapComponent as NgxSciencemapComponent } from '@ngx-dino/science-map';
import { MockComponent } from 'ng-mocks';

import { SciencemapComponent } from './sciencemap.component';

describe('SciencemapComponent', () => {
  let component: SciencemapComponent;
  let fixture: ComponentFixture<SciencemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SciencemapComponent, MockComponent(NgxSciencemapComponent) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SciencemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
