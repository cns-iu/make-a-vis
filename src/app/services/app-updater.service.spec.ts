import { TestBed } from '@angular/core/testing';

import { AppUpdaterService } from './app-updater.service';

describe('AppUpdaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  xit('should be created', () => {
    const service: AppUpdaterService = TestBed.inject(AppUpdaterService);
    expect(service).toBeTruthy();
  });
});
