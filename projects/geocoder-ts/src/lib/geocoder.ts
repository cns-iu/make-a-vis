import { Location } from './Location';
import { GeocoderUS } from './geocoder-us';
import { GeocoderGlobal } from './geocoder-global';
import { GeocoderCache } from './geocoder-cache';

export class Geocoder {
    locationCache = new GeocoderCache();

    constructor(public cache = true, private accessToken = 'pk.eyJ1IjoiYWRwaGlsbGlwczIwMTciLCJhIjoiY2s1NDNvaHdrMGZidDNobHFkdHB5MG1wcCJ9.NG8JyVzQuA6pP9UfZhlubg') { }

    getLocation(address: string): Location {
        if (this.cache && this.locationCache.contains(address)) {
            return this.locationCache.lookup(address);
        }

        let location: Location;

        const geocoderUS = new GeocoderUS();
        location = geocoderUS.getUSLocation(address);
        if (location) {
            if (this.cache) {
                this.locationCache.store(address, location);
            }
            return location;
        }

        // getcities1000

        const geocoderGlobal = new GeocoderGlobal();
        geocoderGlobal.getGlobalLocation(address)
            .then(result => result);

        if (this.cache) {
            this.locationCache.store(address, location);
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
