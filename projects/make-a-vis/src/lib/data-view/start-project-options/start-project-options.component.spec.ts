import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Provider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import { StartProjectOptionsComponent } from './start-project-options.component';

describe('StartProjectOptionsComponent', () => {
  let component: StartProjectOptionsComponent;
  let fixture: ComponentFixture<StartProjectOptionsComponent>;
  const mockedStore = { pipe: () => ({ subscribe: (): void => undefined}) };
  const mockedSnackBar = {dismiss: () => undefined };
  const mockedProviders: Provider[] = [
    { provide: Store, useValue: mockedStore},
    { provide: MatSnackBar, useValue: mockedSnackBar},
    { provide: MatDialog, useValue: {} }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ StartProjectOptionsComponent ],
      providers: [mockedProviders]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StartProjectOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
