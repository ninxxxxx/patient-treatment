import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import X2JS from 'x2js';

import 'rxjs/add/operator/map';

/*
  Generated class for the PatientService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
  	*/
  @Injectable()
  export class PatientService {

  	constructor(public http: Http) {
  		console.log('Hello PatientService Provider');
  	}

  	login(){
  		let url = "http://www.nbtcrehab.eng.psu.ac.th:8080/ConfigurationServer/webresources/getthreshold?Patient_ID=58333333&Device_ID=7";
  		let header = new Headers({'Content-Type': 'text/plain'});
  		let options = new RequestOptions({headers: header})
  		let response = this.http.get(url, options)
  		.map(res => this.parseXtoJ(res));
  		return response;
  		
  	}

    getCurrent(){
      let url = "http://nbtcrehab.eng.psu.ac.th:8080/ConfigurationServer/webresources/getcurrent?Patient_ID=58333333&Device_ID=7";
      // let header = new Headers({'Content-Type': 'text/plain'});
      // let options = new RequestOptions({headers: header})
      let response = this.http.get(url)
      .map(res => this.parseXtoJ(res));
      return response;

    }


    getXml(){
      let res = this.http.get('http://www.gazetaexpress.com/rss/sport/?xml=1');
      return res;
    }

    parseXtoJ(xml){
      let l = JSON.parse(JSON.stringify(xml));
      // console.log("data", l._body);
      let parser : any = new X2JS();
      let json = parser.xml2js(l._body);
      return json;      
    }
  }
