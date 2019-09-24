import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GeomapComponent as NgxGeomapComponent } from '@ngx-dino/geomap';
import { MockComponents } from 'ng-mocks';

import { GeomapComponent } from './geomap.component';

describe('GeomapComponent', () => {
  let component: GeomapComponent;
  let fixture: ComponentFixture<GeomapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeomapComponent, MockComponents(NgxGeomapComponent) ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeomapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});