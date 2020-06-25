import { TestBed } from '@angular/core/testing';

import { GetLinkService } from './get-link.service';

describe('GetLinkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should be created', () => {
    const service: GetLinkService = TestBed.inject(GetLinkService);
    expect(service).toBeTruthy();
  });
});
