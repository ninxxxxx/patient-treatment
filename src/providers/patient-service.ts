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

    parseXtoJ(xml){
      let l = JSON.parse(JSON.stringify(xml));
      let parser : any = new X2JS();
      let json = parser.xml2js(l._body);
      return json;      
    }
    
    login(username){
      let url = "http://www.nbtcrehab.eng.psu.ac.th:8080/ConfigurationServer/webresources/getthreshold?Patient_ID=" + username + "&Device_ID=7";
      let header = new Headers({'Content-Type': 'text/plain'});
      let options = new RequestOptions({headers: header})
      let response = this.http.get(url, options)
      .map(res => this.parseXtoJ(res));
      // return XML json 
      return response;

    }
    getTheshold(username){
      let url = "http://www.nbtcrehab.eng.psu.ac.th:8080/ConfigurationServer/webresources/getthreshold?Patient_ID=" + username + "&Device_ID=7";
      let header = new Headers({'Content-Type': 'text/plain'});
      let options = new RequestOptions({headers: header})
      let response = this.http.get(url, options)
      .map(res => this.parseXtoJ(res));
      // return XML json 
      return response;

    }

    getCurrent(username){
      let url = "http://nbtcrehab.eng.psu.ac.th:8080/ConfigurationServer/webresources/getcurrent?Patient_ID=" + username + "&Device_ID=7";
      // let header = new Headers({'Content-Type': 'text/plain'});
      // let options = new RequestOptions({headers: header})
      let response = this.http.get(url)
      .map(res => this.parseXtoJ(res));
      return response;

    }

    sendResult(userId, data, startTime, EndTime){
      console.log(userId);
      console.log(data);
      console.log(startTime);
      console.log(EndTime);
      // let list = ["C0001PID","C0001S_DT","C0001E_DT","C0001WNO","C0001DNO","C0001SNO","C0001TNO","C0001DID","C0001MV1","C0001MV2","C0001MV3","C0001MV4","C0001MV5"]
      let url = 
      "http://nbtcrehab.eng.psu.ac.th:8080/httpds?_device=C0001"+
      "&C0001PID=" + userId +
      "&C0001S_DT=" + startTime +
      "&C0001E_DT=" + EndTime +
      "&C0001WNO=" + data.week_no +
      "&C0001DNO=" + data.day_no +
      "&C0001SNO=" + data.set_no +
      "&C0001TNO=" + data.time_no +
      "&C0001DID=" + 7 +
      "&C0001MV1=" + data.passTimeAvrg +
      "&C0001MV2=" + data.pressAvrg +
      "&C0001MV3=" + data.sumOfPassTime +
      "&C0001MV4=" + (data.isPass ? 1 : 0) ;

      let response = this.http.get(url)
      .map(res => this.parseXtoJ(res));
      return response;
    }    
  }