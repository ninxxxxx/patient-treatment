import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

import { PatientService } from '../../providers/patient-service';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html',
	providers: [PatientService]
})
export class HomePage {

	res: any;
	constructor(private patientService: PatientService, public navCtrl: NavController) {
		// this.getPatientData();
		this.dd();
	}

	// getPatientData(){
	// 	this.patientService.login("58333333").subscribe(
	// 		res => {
	// 			this.res = res;
	// 			console.log(res);
	// 		},
	// 		err => {
	// 			console.log(err);
	// 		}

	// 		)
	// }

	dd(){
		let url = "http://www.nbtcrehab.eng.psu.ac.th:8080/ConfigurationServer/webresources/getthreshold?Patient_ID=58333333&Device_ID=7";
		var xhr = new XMLHttpRequest();
		xhr.open('GET', url, true);

		// If specified, responseType must be empty string or "document"
		xhr.responseType = 'document';

		// overrideMimeType() can be used to force the response to be parsed as XML
		xhr.overrideMimeType('text/xml');

		xhr.onload = function () {
			if (xhr.readyState === xhr.DONE) {
				if (xhr.status === 200) {
					console.log(xhr.response);
					console.log(xhr.responseXML);
				}
			}
		};

		xhr.send(null);
	}

}