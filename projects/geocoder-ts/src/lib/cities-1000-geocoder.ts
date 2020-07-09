import { Location } from './models/Location';
import { Geocoder } from './models/Geocoder';

import { isoToCountry } from './iso-to-country';
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

interface SearchTerms {
  city: string;
  country: string;
}

export class GlobalCitiesGeocoder implements Geocoder {
  cities: Promise<City[]>;

  constructor() {
    this.cities = this.getCities1000();
  }

  async getLocation(address: string): Promise<Location> {
    const searchTerms: SearchTerms[] = this.getSearchTerms(address);
    const cities = (await this.cities);
    let result;
    let resultIndex;
    let possibleResults;

    for (const [index, terms] of searchTerms.entries()) {
      const { city, country } = terms;
      if (country !== '') {
        result = cities.find(term =>
          this.formatSearch(city).includes(this.formatSearch(term.name)) &&
          this.formatSearch(term.country) === this.formatSearch(country)
        );
      } else {
        // If searching by only city, return only if there's only one match to ensure accuracy.
        possibleResults = cities.filter(term =>
          this.formatSearch(city) === this.formatSearch(term.name)
        );
        if (possibleResults.length === 1) {
          result = possibleResults[0];
        }
      }

      if (result) {
        resultIndex = index;
        break;
      }
    }


    if (!result) {
      return undefined;
    }

    return {
      city: searchTerms[resultIndex].city,
      country: searchTerms[resultIndex].country,
      latitude: result.loc.coordinates[1],
      longitude: result.loc.coordinates[0],
      state: '',
      zip: ''
    } as Location;
  }

  formatSearch(search: string): string {
    const normalizedSearch = search.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const deHyphenatedSearch = normalizedSearch.replace(/-/g, ' ');
    const lowerCaseSearch = deHyphenatedSearch.toLowerCase();
    const trimmedSearch = lowerCaseSearch.trim();

    return trimmedSearch;
  }

  getSearchTerms(address: string): SearchTerms[] {
    const searchTerms: SearchTerms[] = [];
    const termsArray = address.split(',');

    if (!address) {
      return searchTerms;
    }

    if (termsArray.length === 1) {
      searchTerms.push({
        city: termsArray[0],
        country: ''
      });
    } else if (termsArray.length === 2) {
      searchTerms.push({
        city: termsArray[0],
        country: termsArray[1]
      });
    } else {
      searchTerms.push({
        city: termsArray[termsArray.length - 2],
        country: termsArray[termsArray.length - 1]
      });
      searchTerms.push({
        city: termsArray[termsArray.length - 3],
        country: termsArray[termsArray.length - 1]
      });
    }

    searchTerms.forEach(term => {
      if (term.country.includes('USA')) {
        term.country = 'United States';
      } else if (term.country.includes('Wales')) {
        term.country = 'United Kingdom';
      }

      term.city = term.city.trim();
      term.country = term.country.trim();

      // If the country ends with a period, remove it.
      if (term.country[term.country.length - 1] === '.') {
        term.country = term.country.slice(0, -1);
      }
    });

    return searchTerms;
  }

  async getCities1000(): Promise<City[]> {
    const citiesFile = await this.getPbf();
    const citiesObjects = this.pbfToJson(citiesFile);
    const city = this.parseIsoToCountry(citiesObjects);
    return city;
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
        case (1): {
          city.cityId = _pbf.readSVarint();
          break;
        }
        case (2): {
          city.name = _pbf.readString();
          break;
        }
        case (3): {
          city.country = _pbf.readString();
          break;
        }
        case (4): {
          city.altName = _pbf.readString();
          break;
        }
        case (5): {
          city.muni = _pbf.readString();
          break;
        }
        case (6): {
          city.muniSub = _pbf.readString();
          break;
        }
        case (7): {
          city.featureCode = _pbf.readString();
          break;
        }
        case (8): {
          city.adminCode = _pbf.readString();
          break;
        }
        case (9): {
          city.population = _pbf.readVarint();
          break;
        }
        case (10): {
          lastLon += _pbf.readSVarint();
          city.loc.coordinates[0] = lastLon / 1e5;
          break;
        }
        case (11): {
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
      } as City));
    }

    return cities;
  }

  parseIsoToCountry(cities: City[]): City[] {
    return cities.map(city => {
      return { ...city, country: isoToCountry(city.country) } as City;
    });
  }
}
