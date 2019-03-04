import { TestBed } from '@angular/core/testing';

import { LoadProjectService } from './load-project.service';

describe('LoadProjectService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should be created', () => {
    const service: LoadProjectService = TestBed.get(LoadProjectService);
    expect(service).toBeTruthy();
  });
});
