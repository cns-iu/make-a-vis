import { Location } from './models/Location';
import { Geocoder } from './models/Geocoder';

export class PipedGeocoder  {
    constructor(private geocoders: Geocoder[]) { }

    geocodersCount: Location[][] = [[], [], []];

   async getLocation(address: string): Promise<Location> {
        let location: Location;
        let index = 0;

        while (!location && index < this.geocoders.length) {
            location = await this.geocoders[index].getLocation(address);
            if (location) {
                this.geocodersCount[index].push(location);
            }
            index++;
        }

        console.log('COUNTS = ', this.geocodersCount);
        return location;
    }
}
