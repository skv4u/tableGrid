import { Injectable } from '@angular/core';

@Injectable()
export class ConfigurationMicroService {

  private baseURL:string;

  constructor() {
    this.setURL();
  }

  setURL() {
    let host = window.location.host;
    if (host.indexOf('localhost') == -1 ) { //Production     
      this.baseURL = "https://datahubapi.idsnext.com";      
    } else {  // Development     
      this.baseURL = 'http://' + window.location.host;
    }
  }

  /**
   * @return Config URL
   */
  getBaseURL(): string {
    return this.baseURL;
  }

}
