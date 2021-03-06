import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeomapIconComponent } from '../icons/geomap/geomap-icon.component';
import { HorizontalBarGraphIconComponent } from '../icons/horizontal-bar-graph/horizontal-bar-graph-icon.component';
import { MapOfScienceIconComponent } from '../icons/map-of-science/map-of-science-icon.component';
import { NetworkIconComponent } from '../icons/network/network-icon.component';
import { ScatterGraphIconComponent } from '../icons/scatter-graph/scatter-graph-icon.component';
import { MenuComponent } from './menu.component';


describe('visualization-view', () => {
describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        MenuComponent,

        HorizontalBarGraphIconComponent,
        GeomapIconComponent,
        MapOfScienceIconComponent,
        NetworkIconComponent,
        ScatterGraphIconComponent
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
});
