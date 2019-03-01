import { TestBed } from '@angular/core/testing';

import { ExportTableService } from './export-table.service';

describe('ExportTableService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportTableService = TestBed.get(ExportTableService);
    expect(service).toBeTruthy();
  });
});
