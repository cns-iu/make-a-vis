import { Injectable } from '@angular/core';
import { Feature, MultiPolygon, Polygon } from '@turf/helpers';
import { defer, Observable } from 'rxjs';
import { loader as vegaLoader, read as vegaReader } from 'vega';


@Injectable({
  providedIn: 'root'
})
export class GeomapDataService {
  private _countries: Promise<Feature<Polygon|MultiPolygon>[]>;
  private _states: Promise<Feature<Polygon|MultiPolygon>[]>;

  constructor() { }

  get countries(): Promise<Feature<Polygon|MultiPolygon>[]> {
    if (!this._countries) {
      this._countries = vegaLoader()
        .load('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
        .then(
          (data) => vegaReader(data, {type: 'topojson', feature: 'countries'})
        ) as Promise<Feature<Polygon|MultiPolygon>[]>;
    }
    return this._countries;
  }

  get states(): Promise<Feature<Polygon|MultiPolygon>[]> {
    if (!this._states) {
      this._states = vegaLoader()
        .load('https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json')
        .then(
          (data) => vegaReader(data, {type: 'topojson', feature: 'states'})
        ) as Promise<Feature<Polygon|MultiPolygon>[]>;
    }
    return this._states;
  }

  async getCountry(country: string | number): Promise<Feature<Polygon|MultiPolygon> | undefined> {
    return (await this.countries).find(c =>
      c.id === country || c.properties.name === country
    );
  }

  async getState(state: string | number): Promise<Feature<Polygon|MultiPolygon> | undefined> {
    return (await this.states).find(c =>
      c.id === state || c.properties.name === state
    );
  }

  getCountries(): Observable<Feature<Polygon|MultiPolygon>[]> {
    return defer(() => this.countries);
  }

  getStates(): Observable<Feature<Polygon|MultiPolygon>[]> {
    return defer(() => this.states);
  }
}
