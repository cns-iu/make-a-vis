import { TestBed, inject } from '@angular/core/testing';

import { ExportService } from './export.service';

describe('ExportService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportService]
    });
  });

  // FIXME: To be fixed after test coverage setup in SONAR
  xit('should be created', inject([ExportService], (service: ExportService) => {
    expect(service).toBeTruthy();
  }));
});


