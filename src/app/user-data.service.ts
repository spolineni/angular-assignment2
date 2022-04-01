import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap } from 'rxjs';
import * as xml2js from 'xml2js';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  constructor(private http: HttpClient) { }

  //delay of 5 seconds added
  getJsonUserData(): Observable<any> {
    return this.http.get('https://run.mocky.io/v3/e6eb9068-d150-46b4-8f31-936bb8943bb7?mocky-delay=5000ms');
  }  

  //delay of 10 seconds added
  getXmlUserData(): Observable<any> {
    return this.http.get('https://run.mocky.io/v3/a1620afc-18fd-431a-ba36-80936edeeec7?mocky-delay=10000ms', { responseType: "text" }).pipe(
      switchMap(async xml => await this.parseFn(xml))
    );;
  }  

  //parsing xml data to JSON using xml2js library
  parseFn(xml: any) {
    return xml2js.parseStringPromise(xml, { explicitArray: false, valueProcessors: [xml2js.processors.parseNumbers] }).then((response: any) => response.persons);
  }
}
