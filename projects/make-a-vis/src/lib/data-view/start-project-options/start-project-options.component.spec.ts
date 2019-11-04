import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartProjectOptionsComponent } from './start-project-options.component';
import { Provider } from '@angular/core';
import { Store } from '@ngrx/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('StartProjectOptionsComponent', () => {
  let component: StartProjectOptionsComponent;
  let fixture: ComponentFixture<StartProjectOptionsComponent>;
  const mockedStore = { pipe: () => ({ subscribe: (): void => undefined}) };
  const mockedSnackBar = {dismiss: () => undefined };
  const mockedProviders: Provider[] = [
    { provide: Store, useValue: mockedStore},
    { provide: MatSnackBar, useValue: mockedSnackBar}

  ];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ StartProjectOptionsComponent ],
      providers: [mockedProviders]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartProjectOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
