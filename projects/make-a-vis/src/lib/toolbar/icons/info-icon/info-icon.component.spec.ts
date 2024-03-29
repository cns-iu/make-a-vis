import { Provider } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { MockComponent } from 'ng-mocks';

import { InfoIconComponent } from './info-icon.component';

describe('InfoIconComponent', () => {
  let component: InfoIconComponent;
  let fixture: ComponentFixture<InfoIconComponent>;

  beforeEach(async () => {
    const mockedMatDialog = { open: (): void => undefined };
    const mockedStore = { dispatch: (): void => undefined };
    const mockedProviders: Provider[] = [
      { provide: MatDialog, useValue: mockedMatDialog },
      { provide: Store, useValue: mockedStore }
    ];

    await TestBed.configureTestingModule({
      imports: [ MatDialogModule ],
      providers: mockedProviders,
      declarations: [ InfoIconComponent, MockComponent(MatIcon) ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
