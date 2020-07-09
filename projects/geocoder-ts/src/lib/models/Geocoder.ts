import { Location } from './Location';
export interface Geocoder {
    getLocation(address: string): Location | Promise<Location> | undefined;
}
