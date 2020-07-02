import { Location } from './Location';
import { GeocoderCache } from './geocoder-cache';

export class GeocoderGlobal {
    locationCache = new GeocoderCache();

    constructor(public cache = true, private accessToken = 'pk.eyJ1IjoiYWRwaGlsbGlwczIwMTciLCJhIjoiY2s1NDNvaHdrMGZidDNobHFkdHB5MG1wcCJ9.NG8JyVzQuA6pP9UfZhlubg') { }

    async getGlobalLocation(address: string): Promise<Location> {
        if (this.cache && this.locationCache.contains(address)) {
            return this.locationCache.lookup(address);
        }

        const url = this.buildLookupUrl(address);
        const result = await fetch(url)
            .then(response => response.json())
            .then(json => json);

        console.log('result: ', result);
        const locationResult: Location = this.buildLocation(result);
        console.log('locationResult: ', locationResult);
        if (this.cache) {
            this.locationCache.store(address, locationResult);
        }
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
}
