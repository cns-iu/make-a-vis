import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import 'hammerjs';

import { createStubComponent } from '../../../testing/utility';
import { MainComponent } from './main.component';

describe('toolbar', () => {
describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatSidenavModule
      ],
      declarations: [
        createStubComponent('mav-toolbar-content', { outputs: ['toggleSidenav'] }),
        createStubComponent('mav-sidenav-content', { inputs: ['panelsOpenState'] }),
        MainComponent
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
