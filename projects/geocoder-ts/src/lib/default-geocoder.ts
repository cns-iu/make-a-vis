import { USGeocoder } from './us-geocoder';
import { GlobalCitiesGeocoder } from './cities-1000-geocoder';
import { GlobalGeocoder } from './global-geocoder';
import { PipedGeocoder } from './piped-geocoder';
import { CachedGeocoder } from './cached-geocoder';

import { Geocoder } from './models/Geocoder';
import { Location } from './models/Location';

export class DefaultGeocoder implements Geocoder {
    usGeocoder = new USGeocoder();
    citiesGeocoder = new GlobalCitiesGeocoder();
    globalGeocoder = new GlobalGeocoder();
    pipedGeocoder = new PipedGeocoder([this.usGeocoder, this.citiesGeocoder, this.globalGeocoder]);
    cachedGeocoder = new CachedGeocoder(this.pipedGeocoder);

    async getLocation(address: string): Promise<Location> {
        return await this.cachedGeocoder.getLocation(address);
    }
}
