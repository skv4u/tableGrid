import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/map';
import { ConfigurationMicroService } from './configuration-micro.service';


@Injectable()
export class CommonService {
  
  private BaseURL: any = this._config.getBaseURL();
  constructor(private http: Http,
    private _config: ConfigurationMicroService) { }

 // method post
 PostMethod(url, data) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');
  let body = data;
  let endPoint = this.BaseURL + "/" + url;
  return this.http.post(endPoint, body, { headers: headers })
    .map((response: Response) => response.json())
  
}


// method get
GetMethod(args: string) {
  let headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  let baseEndPoint = this.BaseURL + "/" + args;
  return this.http.get(baseEndPoint, { headers: headers })
    .map((response: Response) => response.json());
}

}
