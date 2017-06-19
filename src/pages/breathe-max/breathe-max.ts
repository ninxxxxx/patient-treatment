import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams, ToastController } from 'ionic-angular';

import { BLE } from '@ionic-native/ble';
import { Storage } from '@ionic/storage';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

import { PatientDataPage } from '../../pages/patient-data/patient-data'

import { PatientService } from '../../providers/patient-service';

/*
  Generated class for the BreatheMax page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-breathe-max',
  	templateUrl: 'breathe-max.html',
    providers: [PatientService]
  })
  export class BreatheMaxPage {

    @ViewChild(BaseChartDirective) chart: BaseChartDirective;

    d: string;//value of current pressure 
    sumOfPress: number;// sum of pressure
    numOfPress: number; //number of pressure
    pressAvrg: number;// sum/num ofPress

    isPass: boolean;
    numOfHalfPass: number;
    sumOfPassTime: number;
    numOfPassTime: number;
    passTimeAvrg: number;    

    data: any;
    device: any;
    ddd: number;
    fff: number;
    evrg: number;
    isStart: boolean;
    isConnect: boolean;
    chartData: any;  

    currentData: any;

    //Treatment info
    treatInfo: any;
    
    // pressure: number;    
    setCounter: number;
    totalSet: number;
    totalDay: number;
    totalWeek: number;

    //for countDown
    interval: any;
    isCountDown:  boolean;

    isDone: boolean;
    //========================
    wi: string;
    wii :number;
    //3AF779 F7C33A FA7155
    startDate;
    endDate;

    timeTarget;
    userId:string = "";

    public doughnutChartLabels:string[] = [];
    public doughnutChartData:number[] = [0, 0, 0, 255];
    public doughnutChartType:string = 'doughnut';

    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }

    constructor(
      public toastCtrl: ToastController,
      private patientService: PatientService,
      private ble: BLE,
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public storage: Storage, 
      public modalCtrl: ModalController
      ) 
    {
      this.isPass = false;
      this.isDone = false;
      this.isStart = false;
      this.isConnect = false;
      this.ddd = 0;
      this.fff = 0;
      this.data = [];
      this.d = "0";
      this.device = this.navParams.get('device');

      this.sumOfPress = 0;
      this.numOfPress = 0;
      this.pressAvrg = 0;

      this.numOfHalfPass = 0;
      this.sumOfPassTime = 0;
      this.numOfPassTime = 0;
      this.passTimeAvrg = 0;
      
      // Treatment info
      this.treatInfo = {
        patient_id: 0, 
        device_id: 0, 
        week_no: 0, 
        day_no: 0, 
        set_no: 0, 
        time_no: 0, 
        noDayinWeek: 0, 
        noSetinDay: 0, 
        noTimeinSet: 0, 
      }
      this.getTreatInfo();
      // this.getCurrentData();

      this.wi = 0 + "%";
      this.ff();  

    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad BreatheMaxPage');
    }    


    ionViewWillEnter(){
      console.log("ionViewWillEnter")
    }
    ionViewDidEnter(){
      console.log("ionViewDidEnter")
    }
    ionViewWillLeave(){
      console.log("ionViewWillLeave")
    }
    ionViewDidLeave(){
      console.log("ionViewDidLeave")
    }
    ionViewWillUnload(){
      console.log("ionViewWillUnload")
    }
    ionViewCanEnter(){
      console.log("ionViewCanEnter")
    }
    ionViewCanLeave(){
      console.log("ionViewCanLeave")
    }

    ff(){
      let i = setInterval(()=>{
        this.fff++;
        if(this.fff == 10000)
          clearInterval(i);
      }, 10);
    }

    getTreatInfo(){
      this.storage.ready().then(()=>{
        this.storage.get('PatientID').then(id=>{
          this.userId = id;
          this.getCurrentData(this.userId); 
          this.getThesholdData(this.userId); 
        }).catch(err=>console.log("Error: " + err));
      })
    }
    getCurrentData(userId){
      this.patientService.getCurrent(userId).subscribe(
        data=>{
          data = data.current;
          if(data){
            this.treatInfo.day_no = data.Day_NO;
            this.treatInfo.set_no = data.Set_NO;
            this.treatInfo.time_no = data.Time_NO;
          }
        },
        err=>{
          console.log(err);
        })
    }
    getThesholdData(userId){
      this.patientService.login(userId).subscribe(
        data=>{
          let th = data.configurations.configuration;
          console.log("theshold", th);
          this.treatInfo.patient_id = th.Patient_ID;
          this.treatInfo.device_id = th.Device_ID;
          this.treatInfo.week_no = th.Week_NO;
          this.treatInfo.noDayinWeek = th.NoDayinWeek;
          this.treatInfo.noSetinDay = th.NoSetinDay;
          this.treatInfo.noTimeinSet = th.NoTimeinSet;
          this.timeTarget = th.Threshold_2;
        }
        )
    }

    start(){
      this.startDate = new Date();
      this.isStart = true;
      this.ble.startNotification(
        this.device.peripheralId, 
        this.device.service, 
        this.device.measurement)
      .subscribe(
        buffer =>{
          let dd = new Uint8Array(buffer);
          this.d = "" + dd[1];
          this.calPressAvrg(dd[1]);
          this.updateChart(dd[1]);
          this.checkForCountDown(dd[1]);
        },
        err =>{
          console.log("ERROR FROM STARTNOTIFICATION " + err);
        }
        );
    }

    stop(){
      this.ble.stopNotification(
        this.device.peripheralId, 
        this.device.service, 
        this.device.measurement
        )
      .then(
        data=>{
          this.d = "0";
          this.isStart = false;
          console.log(data);
          this.updateChart(0);
        }).catch(
        err =>{
          console.error(err);
        }
        )
      }

      updateChart(value){
        if(value <= 59){
          this.doughnutChartData[0] = value;
          this.doughnutChartData[1] = 0;
          this.doughnutChartData[2] = 0;
        }else if(value < 120){
          this.doughnutChartData[0] = 59;
          this.doughnutChartData[1] = value-59;
          this.doughnutChartData[2] = 0;
        }else if(value <= 255){
          this.doughnutChartData[0] = 59;
          this.doughnutChartData[1] = 120 - 59;
          this.doughnutChartData[2] = value - 120;
        }
        this.doughnutChartData[3] = 255 - value; 
        this.chart.chart.update();
      }

      changeWidth(value){
        this.wi = value + "%";
      }

      checkForCountDown(value){
        if(value >= 80){
          if(!this.isCountDown){
            this.countDown(parseInt(this.timeTarget));
            this.isCountDown = true;
            console.log("isCountDown!");
          }
        }else{
          this.wi = 0 + "%";
          this.isCountDown = false;
          console.log("is not CountDown");
          clearInterval(this.interval);
        }
      }

      countDown(sec){
        let milli = 0;
        let percent = 0;
        this.interval = setInterval(()=>{
          milli += 1000;
          if((milli / 1000) == Math.round((sec) / 2)){
            console.log("pass half");
            this.numOfHalfPass++;
          }
          if(this.numOfPassTime == this.treatInfo.noTimeinSet && this.numOfHalfPass <= (this.treatInfo.noTimeinSet*2)){
            this.isPass = true;
            console.log("ค่าเท่าแล้ว ทั้งที่จำนวนยังไม่ครบ");
          }
          if(this.numOfPassTime < this.treatInfo.noTimeinSet && this.numOfHalfPass >= (this.treatInfo.noTimeinSet*2)){
            this.isPass = false;
            console.log("ค่าน้อยกว่า แต่จำนวนครบแล้ว");
          }
          if(milli == (sec * 1000)){
            this.numOfPassTime++;
            percent = 100;
            console.log("success");
            this.calPassTimeAvrg(sec);
            this.countScore();
          }else if(milli < (sec * 1000)){
            percent = (milli / (sec * 1000)) * 100;             
          }else{
            percent = 100;
            this.calPassTimeAvrg(1);
          }
          this.wi = percent + "%";
        }, 1000);
      }

      countScore(){
        this.treatInfo.time_no++;
        if (this.treatInfo.time_no == this.treatInfo.noTimeinSet){
          this.treatInfo.time_no = 0;
          this.treatInfo.set_no++;
          this.isDone = true;
          this.endDate = new Date();
        }
        if (this.treatInfo.set_no == this.treatInfo.noSetinDay){
          this.treatInfo.set_no = 0;
          this.treatInfo.day_no++;
        }
        if (this.treatInfo.day_no == this.treatInfo.noDayinWeek){
          this.treatInfo.day_no = 0;
        }
      }

      calPressAvrg(pressure){
        if(pressure > 0){
          this.sumOfPress += pressure;
          this.numOfPress++;
          this.pressAvrg = Math.floor(this.sumOfPress / this.numOfPress); 
        }
      }

      calPassTimeAvrg(sec){
        this.sumOfPassTime += sec;
        this.passTimeAvrg = Math.floor(this.sumOfPassTime / this.numOfPassTime);
      }

      done(){
        this.storage.get('PatientID').then(userId=>{
          this.treatInfo["pressAvrg"] = this.pressAvrg;
          this.treatInfo["passTimeAvrg"] = this.passTimeAvrg;
          this.treatInfo["sumOfPassTime"] = this.sumOfPassTime;
          this.treatInfo["isPass"] = this.isPass;
          this.patientService.sendResult(
            userId, 
            this.treatInfo, 
            this.startDate.getTime(), 
            this.endDate.getTime()
            ).subscribe(
            data=>{
              console.log(data);
              this.toast("Good Job!, You Did it", 3);
              this.navCtrl.popToRoot().then(()=>console.log("go to root"));
            },
            err=>{
              this.toast("Can't connect to server", 3);
            }
            )
          })
      }

      toast(msg, sec){
        let toast = this.toastCtrl.create({
          message: msg,
          duration: (sec * 1000),
          position: "bottom"});
        toast.present();            
      }
    }
