import { TestBed, inject } from '@angular/core/testing';

import { ExportToPngService } from './export-to-png.service';

describe('ExportToPngService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportToPngService]
    });
  });

  it('should be created', inject([ExportToPngService], (service: ExportToPngService) => {
    expect(service).toBeTruthy();
  }));
});
