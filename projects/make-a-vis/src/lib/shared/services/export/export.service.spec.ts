import { Provider } from '@angular/core';
import { inject, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { ExportService } from './export.service';

describe('ExportService', () => {
  const mockedStore = { pipe: () => ({ subscribe: (): void => undefined}) };
  const mockedProviders: Provider[] = [
    { provide: Store, useValue: mockedStore},

  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: mockedProviders.concat(ExportService)
    });
  });

  it('should be created', inject([ExportService], (service: ExportService) => {
    expect(service).toBeTruthy();
  }));
});


