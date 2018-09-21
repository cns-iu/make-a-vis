import { TestBed, inject } from '@angular/core/testing';

import { ExportToPdfService } from './export-to-pdf.service';

describe('ExportToPdfService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportToPdfService]
    });
  });

  it('should be created', inject([ExportToPdfService], (service: ExportToPdfService) => {
    expect(service).toBeTruthy();
  }));
});
