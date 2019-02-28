import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { MakeAVisModule } from 'make-a-vis';

import { AppComponent } from './app.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent}
];

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        MakeAVisModule,
        RouterModule.forRoot(appRoutes)
      ],
      declarations: [ AppComponent ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
