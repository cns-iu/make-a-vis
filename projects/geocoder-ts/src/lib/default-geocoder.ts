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
    pipedGeocoder = new PipedGeocoder([this.usGeocoder, this.citiesGeocoder]);
    cachedGeocoder = new CachedGeocoder(this.pipedGeocoder);

    // @TODO:  Move access token to environment variable.
    constructor(
        private mapboxAccessToken: string = 'pk.eyJ1IjoiYmhlcnIyIiwiYSI6ImNrY2V2dDB4MDA5bjgyc215Y3Rpc2cwZW4ifQ.Cy7G4a-vZasggScmRSO8dA',
        private mapboxRateLimit: number = 10
    ) { }

    async getLocation(address: string): Promise<Location> {
        return await this.cachedGeocoder.getLocation(address);
    }
}
