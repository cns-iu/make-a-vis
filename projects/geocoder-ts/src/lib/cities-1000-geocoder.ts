import { Location } from './models/Location';
import { Geocoder } from './models/Geocoder';
import Pbf from 'pbf';

export class GlobalCitiesGeocoder implements Geocoder {
  cities = [];

  async getLocation(address: string): Promise<Location> {
    if (!this.cities.length) {
      const citiesFile = await this.getCities1000();
      this.cities = this.parsePbf(citiesFile);
    }

    const searchTerms = address.split(',');
    const city = searchTerms[0];
    const country = searchTerms[1].trim();

    const result = this.cities.find(term =>
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

  async getCities1000() {
    return fetch('https://cdn.jsdelivr.net/npm/all-the-cities@3.1.0/cities.pbf')
      .then((res) => res.arrayBuffer());
  }

  parsePbf(pbfFile: ArrayBuffer) {
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
      }));
    }

    return cities;
  }
}
