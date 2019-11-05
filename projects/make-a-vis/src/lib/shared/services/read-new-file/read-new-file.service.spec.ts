import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Provider } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';

import { ReadNewFileService } from './read-new-file.service';

describe('ReadNewFileService', () => {
  const mockedStore = { pipe: () => ({ subscribe: (): void => undefined}) };
  const mockedSnackBar = {dismiss: () => undefined };
  const mockedProviders: Provider[] = [
    { provide: Store, useValue: mockedStore},
    { provide: MatSnackBar, useValue: mockedSnackBar}
  ];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [ mockedProviders ]
  }));

  it('should be created', () => {
    const service: ReadNewFileService = TestBed.get(ReadNewFileService);
    expect(service).toBeTruthy();
  });

  it('should check if the extension is valid', () => {
    const service: ReadNewFileService = TestBed.get(ReadNewFileService);
    expect(service.isValidFileExtension('csv', 'csv')).toBeTruthy();
  });

  it('should check if the extension is not allowd', () => {
    const service: ReadNewFileService = TestBed.get(ReadNewFileService);
    expect(service.isValidFileExtension('csv', 'yml')).toBeFalsy();
  });
});
