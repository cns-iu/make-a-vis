import { TestBed } from '@angular/core/testing';

import { UpdateVisService } from './update-vis.service';

describe('UpdateVisService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should be created', () => {
    const service: UpdateVisService = TestBed.inject(UpdateVisService);
    expect(service).toBeTruthy();
  });
});
