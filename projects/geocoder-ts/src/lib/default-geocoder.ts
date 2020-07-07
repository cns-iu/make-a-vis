import { USGeocoder } from './us-geocoder';
import { GlobalCitiesGeocoder } from './cities-1000-geocoder';
import { MapBoxGeocoder } from './mapbox-geocoder';
import { PipedGeocoder } from './piped-geocoder';
import { CachedGeocoder } from './cached-geocoder';
import { RateLimitedGeocoder } from './rate-limited-geocoder';

import { Geocoder } from './models/Geocoder';
import { Location } from './models/Location';

export class DefaultGeocoder implements Geocoder {
    usGeocoder = new USGeocoder();
    citiesGeocoder = new GlobalCitiesGeocoder();
    mapBoxGeocoder = new MapBoxGeocoder(this.mapboxAccessToken);
    rateLimitedGeocoder = new RateLimitedGeocoder(this.mapBoxGeocoder, this.mapboxRateLimit);
    pipedGeocoder = new PipedGeocoder([this.usGeocoder, this.citiesGeocoder, this.rateLimitedGeocoder]);
    cachedGeocoder = new CachedGeocoder(this.pipedGeocoder);

    time: number;
    requestCount = 0;

    constructor(private mapboxAccessToken: string, private mapboxRateLimit: number = 200) {
        this.time = Date.now();
    }

    async getLocation(address: string): Promise<Location> {
        this.requestCount++;
        console.log('Time: ', Date.now() - this.time, '\nRequest #', this.requestCount);
        return await this.cachedGeocoder.getLocation(address);
    }
}
