import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { MatMenu } from '@angular/material/menu';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MakeAVisModule } from 'make-a-vis';
import { MockComponents } from 'ng-mocks';

import { AppComponent } from './app.component';
import { AppUpdaterService } from './services/app-updater.service';

const appRoutes: Routes = [
  { path: '', component: AppComponent}
];
let fixture: ComponentFixture<AppComponent>;
let app: AppComponent;
describe('AppComponent', () => {
  const mockedAppUpdaterService = {
    checkForUpdates: (): void => undefined,
    askToUpdate: (): void => undefined,
  };
  beforeEach(async(() => {
    const mockComponents = MockComponents(
      MatMenu,
      MatIcon
    );
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        HttpClientModule,
        MakeAVisModule,
        RouterModule.forRoot(appRoutes)
      ],
      declarations: [ AppComponent ].concat(mockComponents),
      providers: [
        {provide: AppUpdaterService, useValue: mockedAppUpdaterService}
      ]
    }).compileComponents();
  }));

  it('should create the app with a title', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    expect(app.title).toBe('make-a-vis-demo');
  }));
});
