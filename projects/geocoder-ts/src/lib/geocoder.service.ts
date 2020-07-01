import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeocoderService {

  constructor(private http: HttpClient) { }

  fetchCities1000(): Observable<Object> {
    return this.http.get('https://cdn.jsdelivr.net/npm/all-the-cities@3.1.0/cities.pbf');
  }
}
