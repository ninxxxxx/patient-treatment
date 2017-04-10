import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the PatientData page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-patient-data',
    templateUrl: 'patient-data.html'
  })
  export class PatientDataPage {

    week: string;
    dateTime: string;
    targetPress: string;
    constTime: string;
    dayInWeek: string;
    setInDay: string;
    timeInSet: string;

    constructor(
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public storage: Storage,
      public viewCtrl: ViewController
      ) 
    {
      this.getValue();
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad PatientDataPage');
    }

    getValue(){
      this.storage.ready().then(() => {

        // Or to get a key/value pair
        this.storage.get('WeekNO').then((val) => {
          console.log('WeekNO: ', val);
          this.week = val;
        })

        this.storage.get('ThresholdDateTime').then((val) => {
          console.log('ThresholdDateTime: ', val);
          this.dateTime = val;
        })

        this.storage.get('Threshold1').then((val) => {
          console.log('Threshold1: ', val);
          let tmp: number = (parseInt(val)) * 10;
          this.targetPress = tmp.toString();
        })

        this.storage.get('Threshold2').then((val) => {
          console.log('Threshold2: ', val);
          this.constTime = val;
        })

        this.storage.get('NoDayinWeek').then((val) => {
          console.log('NoDayinWeek: ', val);
          this.dayInWeek = val;
        })

        this.storage.get('NoSetinDay').then((val) => {
          console.log('NoSetinDay: ', val);
          this.setInDay = val;
        })

        this.storage.get('NoTimeinSet').then((val) => {
          console.log('NoTimeinSet: ', val);
          this.timeInSet = val;
        })
      });
    }

    dismiss(){
      this.viewCtrl.dismiss();
    }
    ok(){  
      // this.dismiss();
      this.setIDtoStorage();
      this.viewCtrl.dismiss();
    }

    setIDtoStorage(){
      this.storage.ready().then(() => {
        this.storage.set('ShowDataPatient', "true");
      });
    }

  }
