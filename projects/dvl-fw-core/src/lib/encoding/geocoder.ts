import { map, Operator } from '@ngx-dino/core';
import zipcodes from 'zipcodes';

export interface Location {
  city: string;
  state: string;
  zip: string;
  country: string;
  latitude: number;
  longitude: number;
}

const STATES = Object.keys(zipcodes.states.abbr);

export class Geocoder {
  readonly lookupUSLocationOp: Operator<string, Location>;

  addressCache: any = {};
  zipRegEx = /[^0-9a-z\-](\d{5})[^0-9a-z]/igm;
  stateRegEx = new RegExp(`[^0-9a-z\-](${STATES.join('|')})[^0-9a-z]`, 'igm');
  cityStateRegexCache = {};

  constructor(public cache = true) {
    this.lookupUSLocationOp = map(this.getUSLocation.bind(this));
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
}
