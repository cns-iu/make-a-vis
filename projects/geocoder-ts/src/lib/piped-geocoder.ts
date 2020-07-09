import { Location } from './models/Location';
import { Geocoder } from './models/Geocoder';

export class PipedGeocoder  {
    constructor(private geocoders: Geocoder[]) { }

   async getLocation(address: string): Promise<Location> {
        let location: Location;
        let index = 0;

        while (!location && index < this.geocoders.length) {
            location = await this.geocoders[index].getLocation(address);
            index++;
        }

        return location;
    }
}
