import { Location } from './models/Location';
import { Geocoder } from './models/Geocoder';
import Pbf from 'pbf';

export class GlobalCitiesGeocoder implements Geocoder {
  addressCache: any = {};
  cities = [];

  constructor(public cache = true) { }

  async getLocation(address: string): Promise<Location> {
    if (!this.cities.length) {
      const response = await this.getCities1000();
      this.cities = this.parsePbf(response);
    }

    
    return undefined;
  }

  async getCities1000() {
    return fetch('https://cdn.jsdelivr.net/npm/all-the-cities@3.1.0/cities.pbf')
      .then((res) => res.arrayBuffer());
  }

  parsePbf(pbfFile: ArrayBuffer) {
    const pbf = new Pbf(new Uint8Array(pbfFile));
    const cities = []
    let lastLat = 0
    let lastLon = 0

    function readCity(tag, city, pbf) {
      if (tag === 1) {city.cityId = pbf.readSVarint() }
      else if (tag === 2) { city.name = pbf.readString() }
      else if (tag === 3) { city.country = pbf.readString() }
      else if (tag === 4) { city.altName = pbf.readString() }
      else if (tag === 5) { city.muni = pbf.readString() }
      else if (tag === 6) { city.muniSub = pbf.readString() }
      else if (tag === 7) { city.featureCode = pbf.readString() }
      else if (tag === 8) { city.adminCode = pbf.readString() }
      else if (tag === 9) { city.population = pbf.readVarint() }
      else if (tag === 10) {
        lastLon += pbf.readSVarint()
        city.loc.coordinates[0] = lastLon / 1e5
      } else if (tag === 11) {
        lastLat += pbf.readSVarint()
        city.loc.coordinates[1] = lastLat / 1e5
      }
    }
    while (pbf.pos < pbf.length) {
      cities.push(pbf.readMessage(readCity, {
        cityId: '',
        name: '',
        altName: '',
        country: '',
        featureCode: '',
        adminCode: '',
        population: 0,
        loc: {
          type: 'Point',
          coordinates: [0, 0] //[lon,lat]
        }
      }));
    }

    return cities;
  }
}
