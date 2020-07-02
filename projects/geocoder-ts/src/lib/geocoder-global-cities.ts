import { Location } from './Location';

export class GeocoderGlobalCities {
  addressCache: any = {};

  constructor(public cache = true) {}

  getCities1000() {
    fetch('https://cdn.jsdelivr.net/npm/all-the-cities@3.1.0/cities.pbf')
    .then((res) => res.json())
    .then(json => console.log('json: ', json));

    return undefined;
  }
}
