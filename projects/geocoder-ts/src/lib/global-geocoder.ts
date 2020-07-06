import { Geocoder } from './models/Geocoder';
import { Location } from './models/Location';

export class GlobalGeocoder implements Geocoder {
    constructor(
        private accessToken = 'pk.eyJ1IjoiYWRwaGlsbGlwczIwMTciLCJhIjoiY2s1NDNvaHdrMGZidDNobHFkdHB5MG1wcCJ9.NG8JyVzQuA6pP9UfZhlubg'
    ) { }

    async getLocation(address: string): Promise<Location> {
        const url = this.buildLookupUrl(address);
        const result = await fetch(url)
            .then(response => response.json());

        return this.buildLocation(result) as Location;
    }

    buildLocation(resultObject: any): Location {
        const result = resultObject.features[0];
        const latitude = result.center[0];
        const longitude = result.center[1];

        // Adding top level feature to the context list to parse all at once.
        const resultContext = result.context;
        resultContext.push({ id: result.id, text: result.text });

        let city: string, country: string, state: string, zip: string, feature = '';
        resultContext.forEach(featureObject => {
            feature = featureObject.id.split('.')[0];
            switch (feature) {
                case('postcode'): {
                    zip = featureObject.text;
                    break;
                }
                case('place'): {
                    city = featureObject.text;
                    break;
                }
                case('region'): {
                    state = featureObject.text;
                    break;
                }
                case('country'): {
                    country = featureObject.text;
                    break;
                }
                default: { break; }
            }
        });

        return {
            city,
            country,
            latitude,
            longitude,
            state,
            zip
        } as Location;
    }

    buildLookupUrl(address: string): string {
        const searchTermString = encodeURI(address);
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchTermString}.json?access_token=${this.accessToken}&autocomplete=false&limit=1`;
        return url;
    }
}
