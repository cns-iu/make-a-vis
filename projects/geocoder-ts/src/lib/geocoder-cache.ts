export class GeocoderCache {
    private addressCache: any = {};

    constructor() { }

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
