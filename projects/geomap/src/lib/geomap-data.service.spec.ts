import { TestBed } from '@angular/core/testing';

import { GeomapDataService } from './geomap-data.service';

describe('GeomapDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeomapDataService = TestBed.inject(GeomapDataService);
    expect(service).toBeTruthy();
  });
});
