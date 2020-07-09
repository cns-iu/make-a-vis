import { CachedGeocoder } from './cached-geocoder';

describe('CachedGeocoder', () => {
  it('should be created', () => {
    const geocoder = new CachedGeocoder(undefined);
    expect(geocoder).toBeTruthy();
  });
});
