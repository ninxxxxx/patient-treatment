import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { HelpPage } from '../../pages/help/help';
import { DeviceConnectionPage } from '../../pages/device-connection/device-connection'; 
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

    week: any = "";
    dateTime: any = "";
    targetPress: any = "";
    constTime: any = "";
    dayInWeek: any = "";
    setInDay: any = "";
    timeInSet: any = "";

    constructor(
      public modalCtrl: ModalController,
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public storage: Storage,
      public viewCtrl: ViewController
      ) 
    {
      this.getValue();
      this.isFirstHelp();
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad PatientDataPage');
    }

    isFirstHelp(){
      this.storage.ready().then(()=>{
        this.storage.get('ShowHelp').then(isFirst=>{
          console.log(isFirst);
          if(isFirst == null){
            console.log("isFirst");
            this.storage.set('ShowHelp', true)
            .then(()=>{
              console.log("show help is set")
              let modal = this.modalCtrl.create(HelpPage);
              modal.present();
            });
          }
        })
      })
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
      // this.viewCtrl.dismiss();
    }
    ok(){  
      this.navCtrl.push(DeviceConnectionPage);
    }

    help(){
      let modal = this.modalCtrl.create(HelpPage);
      modal.present();
    }

    setIDtoStorage(){
      this.storage.ready().then(() => {
        this.storage.set('ShowDataPatient', "true");
      });
    }

  }
