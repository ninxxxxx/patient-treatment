import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { ToastController } from 'ionic-angular';
import X2JS from 'x2js';
// import 'what';
import { DeviceConnectionPage } from '../device-connection/device-connection';
import { BreatheMaxPage } from '../breathe-max/breathe-max';
import { PatientDataPage } from '../patient-data/patient-data';
import { PatientService } from '../../providers/patient-service';
import { HelpPage } from '../../pages/help/help';

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
    // getPatientID: string = "";
    // getThresholdID: string = "";
    // getStaffID: string = "";
    // getDeviceID:  string = "";
    // getWeekNO:  string = "";
    // getThresholdDateTime:  string = "";
    // getThreshold1:  string = "";
    // getThreshold2:  string = "";
    // getThreshold3:  string = "";
    // getThreshold4:  string = "";
    // getThreshold5:  string = "";
    // getThreshold6:  string = "";
    // getThreshold7:  string = "";
    // getThreshold8:  string = "";
    // getThreshold9:  string = "";
    // getThreshold10:  string = "";
    // getNoDayinWeek:  string = "";
    // getNoSetinDay:  string = "";
    // getNoTimeinSet:  string = ""; 

    userData: any;
    constructor(
      private patientService: PatientService,
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public storage: Storage,
      public toastCtrl: ToastController
      )
    {
      this.username = "58333333";
      this.password = "2";
      this.userData = {
        PatientID: "",
        ThresholdID: "",
        StaffID: "",
        DeviceID: "",
        WeekNO: "",
        ThresholdDateTime: "",
        Threshold1: "",
        Threshold2: "",
        Threshold3: "",
        Threshold4: "",
        Threshold5: "",
        Threshold6: "",
        Threshold7: "",
        Threshold8: "",
        Threshold9: "",
        Threshold10: "",
        NoDayinWeek: "",
        NoSetinDay: "",
        NoTimeinSet: "",
      }


    }

    setIDtoStorage(){
      this.storage.ready().then(() => {
        // set a key/value
        this.storage.set('PatientID', this.userData.PatientID);
        this.storage.set('ThresholdID', this.userData.ThresholdID);
        this.storage.set('StaffID', this.userData.StaffID);
        this.storage.set('DeviceID', this.userData.DeviceID);
        this.storage.set('WeekNO', this.userData.WeekNO);
        this.storage.set('ThresholdDateTime', this.userData.ThresholdDateTime);
        this.storage.set('Threshold1', this.userData.Threshold1);
        this.storage.set('Threshold2', this.userData.Threshold2);
        this.storage.set('Threshold3', this.userData.Threshold3);
        this.storage.set('Threshold4', this.userData.Threshold4);
        this.storage.set('Threshold5', this.userData.Threshold5);
        this.storage.set('Threshold6', this.userData.Threshold6);
        this.storage.set('Threshold7', this.userData.Threshold7);
        this.storage.set('Threshold8', this.userData.Threshold8);
        this.storage.set('Threshold9', this.userData.Threshold9);
        this.storage.set('Threshold10', this.userData.Threshold10);
        this.storage.set('NoDayinWeek', this.userData.NoDayinWeek);
        this.storage.set('NoSetinDay', this.userData.NoSetinDay);
        this.storage.set('NoTimeinSet', this.userData.NoTimeinSet);
      });
    }

    login(){
      // console.log("Username: " + this.username);
      // console.log("Password: " + this.password);

      if(this.username != "" && this.password != "" && this.username != "" && this.password != ""){
        this.getXML();
      }else{
        let toast = this.toastCtrl.create({
          message: 'Please enter your email and password.',
          duration: 2000,
          position: "bottom"});
        toast.present(toast);
        this.username = "";
        this.password = "";
      }
    }

    getXML(){

      this.patientService.login(this.username).subscribe(
        data=>{
          data = data.configurations.configuration;
          console.log("data");
          console.log(data);
          if(data){  
            //Don't foget make toast for server or network error
            // console.log(this.getPatientID);
            //Order is Important
            this.userData.PatientID = data.Patient_ID;
            this.userData.ThresholdID = data.Threshold_ID;
            this.userData.StaffID = data.Staff_ID;
            this.userData.DeviceID = data.Device_ID;
            this.userData.WeekNO = data.Week_NO;
            this.userData.ThresholdDateTime = data.Threshold_DateTime;
            this.userData.Threshold1 = data.Threshold_1;
            this.userData.Threshold2 = data.Threshold_2;
            this.userData.Threshold3 = data.Threshold_3;
            this.userData.Threshold4 = data.Threshold_4;
            this.userData.Threshold5 = data.Threshold_5;
            this.userData.Threshold6 = data.Threshold_6;
            this.userData.Threshold7 = data.Threshold_7;
            this.userData.Threshold8 = data.Threshold_8;
            this.userData.Threshold9 = data.Threshold_9;
            this.userData.Threshold10 = data.Threshold_10;
            this.userData.NoDayinWeek = data.NoDayinWeek;
            this.userData.NoSetinDay = data.NoSetinDay;
            this.userData.NoTimeinSet = data.NoTimeinSet;
            this.setIDtoStorage();

            this.navCtrl.push(PatientDataPage);
          }else{
            let toast = this.toastCtrl.create({
              message: this.username + " is not registered yet.",
              duration: 2000,
              position: "bottom"});
            toast.present();
            this.userData.patientID = "";
            // this.username = "";
            // this.password = "";
          }
        },
        err =>{
          let toast = this.toastCtrl.create({
            message: "Can't get data from server",
            duration: 2000,
            position: "bottom"});
          toast.present();
        }
        );
    }

    set(){
      let p = {name: "title", foo: "bar"};
      this.storage.set('obj', p);
    }
    get(){
      this.storage.get('obj').then(obj=>{
        console.log(obj);
      })
      .catch(err=>{
        console.log(err);
      })
    }
  }
