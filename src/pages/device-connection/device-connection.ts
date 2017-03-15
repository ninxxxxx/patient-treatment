import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { BLE } from 'ionic-native';

import { BreatheMaxPage } from '../../pages/breathe-max/breathe-max';
import { PatientService } from '../../providers/patient-service';
/*
  Generated class for the DeviceConnection page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-device-connection',
  	templateUrl: 'device-connection.html',
  	providers: [PatientService]
  })
  export class DeviceConnectionPage {
  	deviceCode: any;


  	defaultDevice: any;
  	devices: any;
  	userInfo: any;
  	isConnect: boolean;
  	interval: any;
  	info: any;
  	status: string;
  	data: Promise<string>;
  	datas: any;
  	constructor(private patientService: PatientService, public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) 
  	{
  		this.datas = [];
  		// this.data = new Promise<string>
  		this.status = "";
  		this.defaultDevice = {
  			service: '180D',
  			measurement: '2A37',
  			peripheralId: ''
  		};;
  		this.isConnect = false;
  		this.userInfo = {deviceId:7};
  		this.devices = [{name: "ATMEL-HRP", id:"F8:F0:05:F5:1B:DA", deviceId:7}]; 

  	}

  	ionViewDidLoad() {
  		console.log('ionViewDidLoad DeviceConnectionPage');
  	}

    ionViewWillUnload(){
      if(this.isConnected()){
        BLE.disconnect(this.defaultDevice.peripheralId)
        .then(()=>console.log("Peripheral is Disconnected"))
        .catch(err => console.error(err));
      }
    }

    isConnected(){
      BLE.isConnected(this.defaultDevice.peripheralId)
      .then(()=>{this.isConnect = true})
      .catch(err =>{console.error(err)});
      return this.isConnect;
    }

  	scan(){
  		this.status = "Scanning...";
  		BLE.scan([this.defaultDevice.service], 5).subscribe(
  			device =>{
  				BLE.connect(device.id).subscribe(
  					peripheral=>{
  						this.status = "Connected to " + peripheral.id;
  						this.defaultDevice.peripheralId = peripheral.id;
  						this.isConnect = true;
  					}
  					)
  			},
  			err =>{
  				console.log("err" + err);
  			}
  			)
  	}

  	next(){
  		this.navCtrl.push(BreatheMaxPage, {device: this.defaultDevice});
  	}

  	
  	toast(msgs: string, ms: number){
  		let t = this.toastCtrl.create({message: msgs, duration: ms})
  		t.present();
  	}

  	getXML(){
  		let xhr = new XMLHttpRequest();
  		let ff = "";
  		xhr.open('GET', "http://www.nbtcrehab.eng.psu.ac.th:8080/ConfigurationServer/webresources/getthreshold?Patient_ID=58333333&Device_ID=7", true);

  		// If specified, responseType must be empty string or "document"
  		xhr.responseType = 'document';

  		// overrideMimeType() can be used to force the response to be parsed as XML
  		xhr.overrideMimeType('text/xml');

  		xhr.onload = function () {
  			if (xhr.readyState === xhr.DONE) {
  				if (xhr.status === 200) {
  					ff = xhr.response;
  					console.log(xhr.response);
  					console.log(xhr.responseXML);
  					return xhr.response; 
  				}
  			}
  		};
  		xhr.send(null);
  		setTimeout(()=>{
  			console.log("ff: ", ff);
  		}, 3000);
  	}

  }
