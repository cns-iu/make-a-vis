import { Location } from './models/Location';
import { Geocoder } from './models/Geocoder';
import Pbf from 'pbf';

interface PointLocation {
  type: 'Point';
  coordinates: [number, number]; // [lon,lat]
}
interface City {
  cityId: number | string;
  name: string;
  altName: string;
  country: string;
  featureCode: string;
  population: number;
  loc: PointLocation;
}

export class GlobalCitiesGeocoder implements Geocoder {
  cities: Promise<City[]>;

  constructor() {
    this.cities = this.getCities1000();
  }

  async getLocation(address: string): Promise<Location> {
    const searchTerms = address.split(',');
    const city = searchTerms[0];
    const country = searchTerms[1].trim();

    const result = (await this.cities).find(term =>
      term.name.toLowerCase() === city.toLowerCase() && term.country.trim().toLowerCase() === country.toLowerCase()
    );

    if (!result) {
      return undefined;
    }

    return {
      city,
      country,
      latitude: result.loc.coordinates[1],
      longitude: result.loc.coordinates[0],
      state: '',
      zip: ''
    } as Location;
  }

  async getCities1000(): Promise<City[]> {
    const citiesFile = await this.getPbf();
    return this.pbfToJson(citiesFile);
  }

  async getPbf() {
    return fetch('https://cdn.jsdelivr.net/npm/all-the-cities@3.1.0/cities.pbf')
      .then((res) => res.arrayBuffer());
  }

  pbfToJson(pbfFile: ArrayBuffer) {
    const pbf = new Pbf(new Uint8Array(pbfFile));
    const cities = [];
    let lastLat = 0;
    let lastLon = 0;

    const readCity = (tag: number, city: any, _pbf: Pbf) => {
      switch (tag) {
        case(1): {
          city.cityId = _pbf.readSVarint();
          break;
        }
        case(2): {
          city.name = _pbf.readString();
          break;
        }
        case(3): {
          city.country = _pbf.readString();
          break;
        }
        case(4): {
          city.altName = _pbf.readString();
          break;
        }
        case(5): {
          city.muni = _pbf.readString();
          break;
        }
        case(6): {
          city.muniSub = _pbf.readString();
          break;
        }
        case(7): {
          city.featureCode = _pbf.readString();
          break;
        }
        case(8): {
          city.adminCode = _pbf.readString();
          break;
        }
        case(9): {
          city.population = _pbf.readVarint();
          break;
        }
        case(10): {
          lastLon += _pbf.readSVarint();
          city.loc.coordinates[0] = lastLon / 1e5;
          break;
        }
        case(11): {
          lastLat += _pbf.readSVarint();
          city.loc.coordinates[1] = lastLat / 1e5;
          break;
        }
      }
    };

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
          coordinates: [0, 0] // [lon,lat]
        }
      } as City ));
    }

    return cities;
  }
}
