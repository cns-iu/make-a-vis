import { map, Operator } from '@ngx-dino/core';
import { Location } from './Location';
import zipcodes from 'zipcodes';

const STATES = Object.keys(zipcodes.states.abbr);


export class Geocoder {
  readonly lookupUSLocationOp: Operator<string, Location>;
  addressCache: any = {};
  zipRegEx = /[^0-9a-z\-](\d{5})[^0-9a-z]/igm;
  stateRegEx = new RegExp(`[^0-9a-z\-](${STATES.join('|')})[^0-9a-z]`, 'igm');
  cityStateRegexCache = {};

  constructor(public cache = true, private accessToken = 'pk.eyJ1IjoiYWRwaGlsbGlwczIwMTciLCJhIjoiY2s1NDNvaHdrMGZidDNobHFkdHB5MG1wcCJ9.NG8JyVzQuA6pP9UfZhlubg') {
    this.lookupUSLocationOp = map(this.getUSLocation.bind(this));
  }

  getLocation(address: string): Location {
    let location: Location;

    location = this.getUSLocation(address);
    if (location) {
      return location;
    }

    this.getGlobalLocation(address)
      .then(result => result);
    return location || undefined;
  }

  async getGlobalLocation(address: string): Promise<Location> {
    const url = this.buildLookupUrl(address);
    const result = await fetch(url)
      .then(response => response.json())
      .then(json => json);

    console.log('result: ', result);
    const locationResult: Location = this.buildLocation(result);
    console.log('locationResult: ', locationResult);
    return locationResult;
  }

  buildLocation(resultObject: any): Location {
    const result = resultObject.features[0];
    console.log('result: ', result);

    const city = '';
    const country = '';
    const latitude = result.center[0];
    const longitude = result.center[1];
    const state = '';
    const zip = '';

    return {
      city,
      country,
      latitude,
      longitude,
      state,
      zip
    } as Location;
  }

  buildLookupUrl(address: string): string {
    const searchTermString = encodeURI(address);
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTermString}.json?access_token=${this.accessToken}`;
    return url;
  }

  getUSLocationByZipCode(address: string): Location {
    let match = null, location = null;
    while ((match = this.zipRegEx.exec(address)) !== null) {
      location = zipcodes.lookup(match[1]) || location;
    }
    return location || undefined;
  }

  getUSLocationsByState(address: string): Location[] {
    let match = null, state = null;
    while ((match = this.stateRegEx.exec(address)) !== null) {
      state = match[1];
    }
    return state ? zipcodes.lookupByState(state) : [];
  }

  getUSLocationByCityState(address: string): Location {
    const cities = this.getUSLocationsByState(address);
    let location = null;

    if (cities.length > 0 && cities[0].state) {
      const state = cities[0].state;
      let regex: RegExp = this.cityStateRegexCache[state];
      if (!regex) {
        const cityStates = {};
        cities.forEach(l => cityStates[`(${l.city})\\,?\\ (?:${l.state})`] = true);
        regex = new RegExp(`[^0-9a-z](?:${Object.keys(cityStates).join('|')})[^0-9a-z]`, 'igm');
        this.cityStateRegexCache[state] = regex;
      }

      let match: RegExpExecArray = null;
      regex.lastIndex = -1;
      while ((match = regex.exec(address)) !== null && !location) {
        const city = match.filter(s => !!s)[1];
        const locations = zipcodes.lookupByName(city, state);
        if (locations && locations.length > 0) {
          location = locations[0];
        }
      }
    }
    return location || undefined;
  }

  getUSLocation(address: string): Location {
    if (this.cache && this.addressCache.hasOwnProperty(address)) {
      return this.addressCache[address];
    }
    let location = this.getUSLocationByZipCode(address);
    if (!location) {
      location = this.getUSLocationByCityState(address);
    }
    if (this.cache && location) {
      this.addressCache[address] = location;
    }
    return location || undefined;
  }

  getCities1000() {
    fetch('https://cdn.jsdelivr.net/npm/all-the-cities@3.1.0/cities.pbf')
    .then((res) => res.json())
    .then(json => console.log('json: ', json));

    return undefined;
  }
}
