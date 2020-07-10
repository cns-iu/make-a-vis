import { USGeocoder } from './us-geocoder';
import { GlobalCitiesGeocoder } from './cities-1000-geocoder';
import { MapBoxGeocoder } from './mapbox-geocoder';
import { PipedGeocoder } from './piped-geocoder';
import { CachedGeocoder } from './cached-geocoder';
import { RateLimitedGeocoder } from './rate-limited-geocoder';

import { Geocoder } from './models/Geocoder';
import { Location } from './models/Location';

export class DefaultGeocoder implements Geocoder {
    geocoder: Geocoder;

    // @TODO:  Move access token to environment variable.
    constructor(
        private enableAdvancedGeocoding: boolean = false,
        private mapboxAccessToken: string = 'pk.eyJ1IjoiYmhlcnIyIiwiYSI6ImNrY2V2dDB4MDA5bjgyc215Y3Rpc2cwZW4ifQ.Cy7G4a-vZasggScmRSO8dA',
        private mapboxRateLimit: number = 10
    ) {
        if (this.enableAdvancedGeocoding) {
            const usGeocoder = new USGeocoder();
            const citiesGeocoder = new GlobalCitiesGeocoder();
            const mapBoxGeocoder = new MapBoxGeocoder(this.mapboxAccessToken);
            const rateLimitedGeocoder = new RateLimitedGeocoder(mapBoxGeocoder, this.mapboxRateLimit);
            const pipedGeocoder = new PipedGeocoder([usGeocoder, citiesGeocoder, rateLimitedGeocoder]);

            this.geocoder = new CachedGeocoder(pipedGeocoder);
        } else {
            const usGeocoder = new USGeocoder();
            this.geocoder = new CachedGeocoder(usGeocoder);
        }
    }

    async getLocation(address: string): Promise<Location> {
        return await this.geocoder.getLocation(address);
    }
}
