import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import X2JS from 'x2js';
// import 'what';
import { DeviceConnectionPage } from '../device-connection/device-connection';
import { BreatheMaxPage } from '../breathe-max/breathe-max';

import { PatientService } from '../../providers/patient-service';


/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */

  @Component({
    selector: 'page-login',
    templateUrl: 'login.html',
    providers: [PatientService]
  })
  export class LoginPage {

    username;
    password;
    getpatientID: string = "";
    getThresholdID: string = "";
    getStaffID: string = "";
    getDeviceID:  string = "";
    getWeekNO:  string = "";
    getThresholdDateTime:  string = "";
    getThreshold1:  string = "";
    getThreshold2:  string = "";
    getThreshold3:  string = "";
    getThreshold4:  string = "";
    getThreshold5:  string = "";
    getThreshold6:  string = "";
    getThreshold7:  string = "";
    getThreshold8:  string = "";
    getThreshold9:  string = "";
    getThreshold10:  string = "";
    getNoDayinWeek:  string = "";
    getNoSetinDay:  string = "";
    getNoTimeinSet:  string = ""; 

    constructor(
      private patientService: PatientService,
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public storage: Storage,
      public toastCtrl: ToastController
      )
    {



    }

    setIDtoStorage(){
      this.storage.ready().then(() => {

        // set a key/value
        this.storage.set('PatientID', this.getpatientID);
        this.storage.set('ThresholdID', this.getThresholdID);
        this.storage.set('StaffID', this.getStaffID);
        this.storage.set('DeviceID', this.getDeviceID);
        this.storage.set('WeekNO', this.getWeekNO);
        this.storage.set('ThresholdDateTime', this.getThresholdDateTime);
        this.storage.set('Threshold1', this.getThreshold1);
        this.storage.set('Threshold2', this.getThreshold2);
        this.storage.set('Threshold3', this.getThreshold3);
        this.storage.set('Threshold4', this.getThreshold4);
        this.storage.set('Threshold5', this.getThreshold5);
        this.storage.set('Threshold6', this.getThreshold6);
        this.storage.set('Threshold7', this.getThreshold7);
        this.storage.set('Threshold8', this.getThreshold8);
        this.storage.set('Threshold9', this.getThreshold9);
        this.storage.set('Threshold10', this.getThreshold10);
        this.storage.set('NoDayinWeek', this.getNoDayinWeek);
        this.storage.set('NoSetinDay', this.getNoSetinDay);
        this.storage.set('NoTimeinSet', this.getNoTimeinSet);
      });
    }

    login(){
      console.log("Username: " + this.username);
      console.log("Password: " + this.password);

      if(this.username != null && this.password != null && this.username != "" && this.password != ""){
        this.getXML();
      }else{
        let toast = this.toastCtrl.create({
          message: 'Please enter your email and password.',
          duration: 2000,
          position: "bottom"});
        toast.present(toast);
        this.username = null;
        this.password = null;
      }
    }

    getXML(){

      this.patientService.login().subscribe(
        data=>{
          // console.log("data", JSON.parse(data));
          // console.log("data", JSON.stringify(data));
          let l = JSON.parse(JSON.stringify(data));
          console.log("data", l._body);
          let parser : any = new X2JS();
          let json = parser.xml2js(l._body);
          console.log("json", json);
          

          //Don't foget make toast for server or network error
          this.getpatientID = json.configurations.configuration.Patient_ID;
          console.log(this.getpatientID);

          this.getThresholdID = json.configurations.configuration.Threshold_ID;
          this.getStaffID = json.configurations.configuration.Staff_ID;
          this.getDeviceID = json.configurations.configuration.Device_ID;
          this.getWeekNO = json.configurations.configuration.Week_NO;
          this.getThresholdDateTime = json.configurations.configuration.Threshold_DateTime;
          this.getThreshold1 = json.configurations.configuration.Threshold_1;
          this.getThreshold2 = json.configurations.configuration.Threshold_2;
          this.getThreshold3 = json.configurations.configuration.Threshold_3;
          this.getThreshold4 = json.configurations.configuration.Threshold_4;
          this.getThreshold5 = json.configurations.configuration.Threshold_5;
          this.getThreshold6 = json.configurations.configuration.Threshold_6;
          this.getThreshold7 = json.configurations.configuration.Threshold_7;
          this.getThreshold8 = json.configurations.configuration.Threshold_8;
          this.getThreshold9 = json.configurations.configuration.Threshold_9;
          this.getThreshold10 = json.configurations.configuration.Threshold_10;
          this.getNoDayinWeek = json.configurations.configuration.NoDayinWeek;
          this.getNoSetinDay = json.configurations.configuration.NoSetinDay;
          this.getNoTimeinSet = json.configurations.configuration.NoTimeinSet;

          if(this.username == this.getpatientID){  
            this.setIDtoStorage();
            this.username = null;
            this.password = null;

            // this.navCtrl.push(DeviceConnectionPage);
            this.navCtrl.push(BreatheMaxPage);          
          }else{
            let toast = this.toastCtrl.create({
              message: this.username + ", not register.",
              duration: 2000,
              position: "bottom"});

            toast.present(toast);
            this.getpatientID = null;
            this.username = null;
            this.password = null;
          }
        }
        )
    }


  }
