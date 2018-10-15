import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';

import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';

import { AddIconComponent } from '../icons/add/add-icon.component';
import { CancelIconComponent } from '../icons/cancel/cancel-icon.component';
import { HorizontalBarGraphIconComponent } from '../icons/horizontal-bar-graph/horizontal-bar-graph-icon.component';
import { GeomapIconComponent } from '../icons/geomap/geomap-icon.component';
import { MapOfScienceIconComponent } from '../icons/map-of-science/map-of-science-icon.component';
import { NetworkIconComponent } from '../icons/network/network-icon.component';
import { ScatterGraphIconComponent } from '../icons/scatter-graph/scatter-graph-icon.component';

import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../../shared/store/state';

import { StoreModule } from '@ngrx/store';
import { visualizationStateReducer } from '../shared/store/reducer';

import { MainComponent } from './main.component';
import { MenuComponent } from '../menu/menu.component';

describe('visualization-view', () => {
describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,

        MatChipsModule,
        MatMenuModule,
        MatTabsModule,

        StoreModule.forRoot({}),
        StoreModule.forFeature('visualization', visualizationStateReducer)
      ],
      declarations: [
        AddIconComponent,
        CancelIconComponent,
        HorizontalBarGraphIconComponent,
        GeomapIconComponent,
        MapOfScienceIconComponent,
        NetworkIconComponent,
        ScatterGraphIconComponent,

        MainComponent,
        MenuComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
});
