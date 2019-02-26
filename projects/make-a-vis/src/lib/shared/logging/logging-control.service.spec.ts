import { TestBed, inject } from '@angular/core/testing';

import { LoggingControlService } from './logging-control.service';

describe('LoggingControlService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoggingControlService]
    });
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should be created', inject([LoggingControlService], (service: LoggingControlService) => {
    expect(service).toBeTruthy();
  }));
});
