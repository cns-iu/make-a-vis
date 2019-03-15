import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon, MatMenu } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MakeAVisModule } from 'make-a-vis';
import { MockComponents } from 'ng-mocks';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent}
];
let fixture: ComponentFixture<AppComponent>;
let app: AppComponent;
describe('AppComponent', () => {
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
      declarations: [ AppComponent ].concat(mockComponents)
    }).compileComponents();
  }));

  it('should create the app with a title', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    expect(app.title).toBe('make-a-vis-demo');
  }));
});
