import { Geocoder } from './models/Geocoder';
import { Location } from './models/Location';

export class CachedGeocoder implements Geocoder {
    private addressCache: Map<string, Location> = new Map();

    constructor(private geocoder: Geocoder) { }

    async getLocation(address: string): Promise<Location> {
        if (this.addressCache.has(address)) {
            return this.addressCache.get(address);
        }

        const location: Location = await this.geocoder.getLocation(address);
        this.addressCache.set(address, location);
        return location;
    }
}
