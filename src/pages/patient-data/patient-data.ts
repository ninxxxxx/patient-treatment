import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


import { PatientService } from '../../providers/patient-service';
import { HelpPage } from '../../pages/help/help';
import { DeviceConnectionPage } from '../../pages/device-connection/device-connection'; 
/*
  Generated class for the PatientData page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
    selector: 'page-patient-data',
    templateUrl: 'patient-data.html',
    providers: [PatientService]
  })
  export class PatientDataPage {

    userId: string;

    week: any = "";
    dateTime: any = "";
    targetPress: any = "";
    constTime: any = "";
    dayInWeek: any = "";
    setInDay: any = "";
    timeInSet: any = "";

    //currentData
    patient_id: any = ""; 
    device_id: any = ""; 
    week_no: any = ""; 
    day_no: any = 0; 
    set_no: any = 0; 
    time_no: any = 0; 
    end_dateTime: any = ""; 
    noDayinWeek: any = ""; 
    noSetinDay: any = ""; 
    noTimeinSet: any = ""; 


    constructor(
      private patientService: PatientService,
      public modalCtrl: ModalController,
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public storage: Storage,
      public viewCtrl: ViewController
      ) 
    {
      this.getUserId();
      // this.getThesholdData(this.userId);
      // this.getCurrentData(this.userId);
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
    getCurrentData(userId){
      this.patientService.getCurrent(userId).subscribe(
        data=>{
          data = data.current;
          if(data){
            this.patient_id = data.Patient_ID;
            this.device_id = data.Device_ID;
            this.week_no = data.Week_NO;
            this.day_no = data.Day_NO;
            this.set_no = data.Set_NO;
            this.time_no = data.Time_NO;
            this.end_dateTime = data.End_DateTime;
            this.noDayinWeek = data.NoDayinWeek;
            this.noSetinDay = data.NoSetinDay;
            this.noTimeinSet = data.NoTimeinSet;
          }
          // this.treatInfo = data.current;
        },
        err=>{
          console.log(err);
        })
    }
    getThesholdData(userId){
      this.patientService.getTheshold(userId).subscribe(
        data=>{
          let th = data.configurations.configuration;
          this.week = th.Week_NO;
          this.dateTime = th.Threshold_DateTime;
          this.targetPress = th.Threshold_1;
          this.constTime = th.Threshold_2;
          this.dayInWeek = th.NoDayinWeek;
          this.setInDay = th.NoSetinDay;
          this.timeInSet = th.NoTimeinSet;
        },
        err=>console.log("Error: " + err)
        )
    }

    getUserId(){
      this.storage.ready().then(()=>{
        this.storage.get('PatientID').then(id=>{
          this.userId = id;
          this.getThesholdData(this.userId);
          this.getCurrentData(this.userId);
        }).catch(err=>console.log("Error: " + err));
      })
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
