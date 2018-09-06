import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ExportSnapshotIconComponent } from '../icons/export-snapshot/export-snapshot-icon.component';
import { LoadProjectIconComponent } from '../icons/load-project/load-project-icon.component';
import { LoggingIconComponent } from '../icons/logging/logging-icon.component';
import { MenuIconComponent } from '../icons/menu/menu-icon.component';
import { NewProjectIconComponent } from '../icons/new-project/new-project-icon.component';
import { SaveIconComponent } from '../icons/save/save-icon.component';
import { ShareIconComponent } from '../icons/share/share-icon.component';

import { SidenavContentComponent } from './sidenav-content.component';

describe('SidenavContentComponent', () => {
  let component: SidenavContentComponent;
  let fixture: ComponentFixture<SidenavContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,

        MatButtonModule,
        MatButtonToggleModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatDividerModule
      ],
      declarations: [
        ExportSnapshotIconComponent,
        LoadProjectIconComponent,
        LoggingIconComponent,
        MenuIconComponent,
        NewProjectIconComponent,
        SaveIconComponent,
        ShareIconComponent,

        SidenavContentComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
