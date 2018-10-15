import { TestBed, inject } from '@angular/core/testing';

import { ExportToSvgService } from './export-to-svg.service';

describe('ExportToSvgService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExportToSvgService]
    });
  });

  it('should be created', inject([ExportToSvgService], (service: ExportToSvgService) => {
    expect(service).toBeTruthy();
  }));
});
