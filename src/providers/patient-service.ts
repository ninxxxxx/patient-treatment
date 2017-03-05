import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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

  	login(id: string){
  		let url = "http://www.nbtcrehab.eng.psu.ac.th:8080/ConfigurationServer/webresources/getthreshold?Patient_ID=" + id + "&Device_ID=7";
  		let header = new Headers({'Content-Type': 'application/xml'});
  		// let header = new Headers({});
  		let options = new RequestOptions({headers: header})
  		let response = this.http.get(url, options)
  		.map(res => ""+res);
  		return response;
  		
  	}
  }
