import { Location } from './models/Location';
import { Geocoder } from './models/Geocoder';

export class GlobalCitiesGeocoder implements Geocoder {
  addressCache: any = {};

  constructor(public cache = true) {}

  async getLocation(address: string): Promise<Location> {
    return undefined as Location;
  }

  getCities1000() {
    fetch('https://cdn.jsdelivr.net/npm/all-the-cities@3.1.0/cities.pbf')
    .then((res) => res);

    return undefined;
  }
}
