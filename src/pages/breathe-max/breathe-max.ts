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

      this.sumOfPassTime = 0;
      this.numOfPassTime = 0;
      this.passTimeAvrg = 0;
      
      // Treatment info
      this.treatInfo = {
        WeekNO: 0,
        NoDayinWeek: 0,
        NoSetinDay: 0,
        NoTimeinSet: 0,
        Day_NO: 0,
        Set_NO: 0,
        Time_NO: 0,
      }
      this.getTreatInfo();
      // this.getCurrentData();

      this.wi = 0 + "%";
      this.ff();  

    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad BreatheMaxPage');
    }    

    ff(){
      let i = setInterval(()=>{
        this.fff++;
        if(this.fff == 10000)
          clearInterval(i);
      }, 10);
    }



    start(){
      this.startDate = new Date();
      this.patientService.login("58333333").subscribe(
        data=>{
          let th = data.configurations.configuration;
          this.treatInfo.NoDayinWeek = th.NoDayinWeek;
          this.treatInfo.NoSetinDay = th.NoSetinDay;
          this.treatInfo.NoTimeinSet = th.NoTimeinSet;
          console.log("theshold", th);
          this.isStart = true;
          this.ble.startNotification(this.device.peripheralId, this.device.service, this.device.measurement).subscribe(
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
        })
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
            this.countDown(3);
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
        this.numOfPassTime++;
        let milli = 0;
        let percent = 0;

        this.interval = setInterval(()=>{
          milli += 25;
          if(milli%1000 == 0){
            console.log("min!");
            this.calPassTimeAvrg();
          }
          this.wi = percent + "%";

          if(milli == (sec * 1000)){
            percent = 100;
            console.log("success");
            this.countScore();
            // clearInterval(this.interval);
          }else if(milli < (sec * 1000)){
            percent = (milli / (sec * 1000)) * 100;             
            // console.log("percent " + percent);
          }else{
            percent = 100;
          }

        }, 25);
      }
      getTreatInfo(){
        Promise.all([
          this.storage.get('WeekNO'),
          this.storage.get('Threshold1'),
          this.storage.get('NoDayinWeek'),
          this.storage.get('NoSetinDay'),
          this.storage.get('NoTimeinSet'),
          ]).then(values =>{
            this.treatInfo.WeekNO = values[0]
            this.treatInfo.Threshold1 = values[1]
            this.treatInfo.NoDayinWeek = values[2]
            this.treatInfo.NoSetinDay = values[3]
            this.treatInfo.NoTimeinSet = values[4]
            console.log(values);
          })
        }

        getCurrentData(){
          this.patientService.getCurrent().subscribe(
            data=>{
              this.treatInfo = data.current;

              // console.log("current", current);
            }
            )
        }
        getThesholdData(){
          this.patientService.login("58333333").subscribe(
            data=>{
              let th = data.configurations.configuration;
              this.treatInfo.NoDayinWeek = th.NoDayinWeek;
              this.treatInfo.NoSetinDay = th.NoSetinDay;
              this.treatInfo.NoTimeinSet = th.NoTimeinSet;
              console.log("theshold", th);
            }
            )
        }

        calPressAvrg(pressure){
          if(pressure > 0){
            this.sumOfPress += pressure;
            this.numOfPress++;
            this.pressAvrg = Math.floor(this.sumOfPress / this.numOfPress); 
          }
        }

        calPassTimeAvrg(){
          this.sumOfPassTime++;
          this.passTimeAvrg = Math.floor(this.sumOfPassTime / this.numOfPassTime);
        }

        countScore(){
          this.treatInfo.Time_NO++;
          if (this.treatInfo.Time_NO == this.treatInfo.NoTimeinSet){
            this.isDone = true;
            this.endDate = new Date();
          }
          // this.endDate = new Date();
        }

        done(){
          this.storage.get('PatientID').then(userId=>{

            this.treatInfo["pressAvrg"] = this.pressAvrg;
            this.treatInfo["passTimeAvrg"] = this.passTimeAvrg;
            this.treatInfo["sumOfPassTime"] = this.sumOfPassTime;

            this.patientService.sendResult(userId, this.treatInfo, this.startDate.getTime(), this.endDate.getTime()).subscribe(
              data=>{
                console.log(data);
                this.toast("Good Job!, You Did it", 3);
                this.navCtrl.popToRoot().then(()=>console.log("go to root"));
              },
              err=>{
                console.log(err);
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
