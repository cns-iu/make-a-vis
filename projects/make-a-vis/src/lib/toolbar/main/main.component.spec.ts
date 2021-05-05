import 'hammerjs';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { createStubComponent } from '../../../testing/utility';
import { sidenavStateReducer } from '../shared/store';
import { MainComponent } from './main.component';

describe('toolbar', () => {
describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatSidenavModule,

        StoreModule.forRoot({}),
        StoreModule.forFeature('ui', sidenavStateReducer)
      ],
      declarations: [
        createStubComponent('mav-toolbar-content', { outputs: ['toggleSidenav'] }),
        createStubComponent('mav-sidenav-content', { inputs: ['panelsOpenState'] }),
        MainComponent
      ]
    })
    .compileComponents();
  });

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
