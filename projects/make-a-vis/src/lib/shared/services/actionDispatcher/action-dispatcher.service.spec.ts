import { TestBed } from '@angular/core/testing';

import { ActionDispatcherService } from './action-dispatcher.service';

describe('ActionDispatcherService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should be created', () => {
    const service: ActionDispatcherService = TestBed.get(ActionDispatcherService);
    expect(service).toBeTruthy();
  });
});
