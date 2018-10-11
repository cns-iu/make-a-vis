import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from 'dvl-fw/dvl-fw';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetLinkService {

  private hardcoded_url : string =  'https://demo.cns.iu.edu';
  private endpoint : string = "/mav-share/index.php"; 
  constructor(private http: HttpClient) { }


  getJSONobjId(projState : Project) : Observable<any> {
    return this.http.put(this.hardcoded_url + this.endpoint,projState);
  }

  getJSONfromId(id:string) : Observable<any> {
    return this.http.get(this.hardcoded_url + this.endpoint + "?id="+id);
  }

}
