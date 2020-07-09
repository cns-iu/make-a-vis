import { Geocoder } from './models/Geocoder';
import { Location } from './models/Location';

export class CachedGeocoder implements Geocoder {
    private addressCache: any = {};

    constructor(private geocoder: Geocoder) { }

    async getLocation(address: string): Promise<Location> {
        if (this.contains(address)) {
            return this.lookup(address);
        }

        const location: Location = await this.geocoder.getLocation(address);
        this.store(address, location);
        return location;
    }

    contains(address: string): boolean {
        return this.addressCache.hasOwnProperty(address);
    }

    lookup(address: string): any {
        if (!this.contains(address)) {
            return undefined;
        }

        return this.addressCache[address];
    }

    store(address: string, location: any): void {
        this.addressCache[address] = location;
    }
}
