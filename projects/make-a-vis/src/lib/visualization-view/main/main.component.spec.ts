import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCard, MatCardTitle } from '@angular/material/card';
import { MatExpansionPanel, MatExpansionPanelHeader, MatExpansionPanelTitle } from '@angular/material/expansion';
import { MatIcon } from '@angular/material/icon';
import { MatHeaderCell, MatHeaderRow } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { DvlFwVisualizationComponent } from '@dvl-fw/core';
import { StoreModule } from '@ngrx/store';
import { MockComponents, MockPipe } from 'ng-mocks';

import { AddIconComponent } from '../icons/add/add-icon.component';
import { CancelIconComponent } from '../icons/cancel/cancel-icon.component';
import { EditIconComponent } from '../icons/edit/edit-icon.component';
import { GeomapIconComponent } from '../icons/geomap/geomap-icon.component';
import { HorizontalBarGraphIconComponent } from '../icons/horizontal-bar-graph/horizontal-bar-graph-icon.component';
import { MapOfScienceIconComponent } from '../icons/map-of-science/map-of-science-icon.component';
import { NetworkIconComponent } from '../icons/network/network-icon.component';
import { ScatterGraphIconComponent } from '../icons/scatter-graph/scatter-graph-icon.component';
import { MenuComponent } from '../menu/menu.component';
import { MainComponent } from './main.component';

describe('visualization-view', () => {
describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    const mockComponents = MockComponents(
      AddIconComponent,
      CancelIconComponent,
      DvlFwVisualizationComponent,
      EditIconComponent,
      GeomapIconComponent,
      HorizontalBarGraphIconComponent,
      MapOfScienceIconComponent,

      MatCard,
      MatCardTitle,
      MatExpansionPanel,
      MatExpansionPanelHeader,
      MatExpansionPanelTitle,
      MatHeaderCell,
      MatHeaderRow,
      MatIcon,

      MenuComponent,
      NetworkIconComponent,
      ScatterGraphIconComponent
    );

    TestBed.configureTestingModule({
      imports: [
        CommonModule,

        MatChipsModule,
        MatMenuModule,
        MatTabsModule,

        StoreModule.forRoot({})
      ],
      declarations: [ MainComponent, mockComponents ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should create', () => {
    expect(component).toBeTruthy();
  });
});
});
