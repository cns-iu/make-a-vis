import { TestBed } from '@angular/core/testing';

import { AppUpdaterService } from './app-updater.service';

describe('AppUpdaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppUpdaterService = TestBed.get(AppUpdaterService);
    expect(service).toBeTruthy();
  });
});
