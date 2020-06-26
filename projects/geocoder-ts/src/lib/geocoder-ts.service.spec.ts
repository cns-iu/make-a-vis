import { TestBed } from '@angular/core/testing';

import { GeocoderTsService } from './geocoder-ts.service';

describe('GeocoderTsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeocoderTsService = TestBed.get(GeocoderTsService);
    expect(service).toBeTruthy();
  });
});
