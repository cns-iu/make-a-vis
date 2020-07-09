import { Geocoder } from './models/Geocoder';
import { Location } from './models/Location';

export class MapBoxGeocoder implements Geocoder {
    constructor(private accessToken: string) { }

    async getLocation(address: string): Promise<Location> {
        const url = this.buildLookupUrl(address);
        const result = await fetch(url)
            .then(response => response.json())
            .catch(error => { console.warn(error); });

        return this.buildLocation(result);
    }

    buildLocation(resultObject: any): Location {
        if (!resultObject || !resultObject?.features || resultObject?.features?.length < 1) {
            return undefined as Location;
        }

        const result = resultObject.features[0];
        const latitude = result.center[0];
        const longitude = result.center[1];

        let resultContext = [];
        if (result.context) {
            resultContext = result.context;
        }
        // Adding top level feature to the context list to parse all at once.
        if (result.id && result.text) {
            resultContext.push({ id: result.id, text: result.text });
        }

        let city: string, country: string, state: string, zip: string, feature = '';
        resultContext.forEach(featureObject => {
            feature = featureObject.id.split('.')[0];
            switch (feature) {
                case ('postcode'): {
                    zip = featureObject.text;
                    break;
                }
                case ('place'): {
                    city = featureObject.text;
                    break;
                }
                case ('region'): {
                    state = featureObject.text;
                    break;
                }
                case ('country'): {
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
