import { TestBed } from '@angular/core/testing';

import { CachedGeocoder } from './cached-geocoder';

describe('CachedGeocoder', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const geocoder = new CachedGeocoder(undefined);
    expect(geocoder).toBeTruthy();
  });
});
