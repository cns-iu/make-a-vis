import { Geocoder } from './models/Geocoder';
import { Location } from './models/Location';

export class RateLimitedGeocoder implements Geocoder {
    constructor(private geocoder: Geocoder, private rateLimitDelay: number = 0) { }

    async getLocation(address: string): Promise<Location> {
        await new Promise(resolve => setTimeout(resolve, this.rateLimitDelay));
        return this.geocoder.getLocation(address);
    }
}
