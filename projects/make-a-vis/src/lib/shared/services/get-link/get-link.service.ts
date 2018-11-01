// refer https://angular.io/guide/styleguide#style-03-06 for import line spacing
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Project } from '@dvl-fw/core';

@Injectable({
  providedIn: 'root'
})
export class GetLinkService {

  private hardcoded_url =  'https://demo.cns.iu.edu';
  private endpoint = '/mav-share/index.php';
  constructor(private http: HttpClient) { }


  getJSONobjId(projState: Project): Observable<any> {
    return this.http.put(this.hardcoded_url + this.endpoint, projState);
  }

  getJSONfromId(id: string): Observable<any> {
    return this.http.get(this.hardcoded_url + this.endpoint + '?id=' + id);
  }

}
