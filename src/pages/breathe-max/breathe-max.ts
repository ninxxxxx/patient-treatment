import { Component, ViewChild } from '@angular/core';
import { ModalController, NavController, NavParams } from 'ionic-angular';

import { BLE } from '@ionic-native/ble';
import { Storage } from '@ionic/storage';

import { BaseChartDirective } from 'ng2-charts/ng2-charts';
// import { Chart, ChartComponent } from 'ng2-chartjs2';

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

    d: string;
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
    //========================
    wi: string;
    wii :number;
    //3AF779 F7C33A FA7155



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
      private patientService: PatientService,
      private ble: BLE,
      public navCtrl: NavController, 
      public navParams: NavParams, 
      public storage: Storage, 
      public modalCtrl: ModalController
      ) 
    {
      this.isStart = false;
      this.isConnect = false;
      this.ddd = 0;
      this.fff = 0;
      this.data = [];
      this.d = "0";
      this.device = this.navParams.get('device');

      
      // Treatment info
      this.treatInfo = {
        WeekNO: 0,
        Threshold1: 0,
        NoDayinWeek: 0,
        NoSetinDay: 0,
        NoTimeinSet: 0,  
      }
      this.getTreatInfo();

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
      this.isStart = true;
      this.ble.startNotification(this.device.peripheralId, this.device.service, this.device.measurement).subscribe(
        buffer =>{
          let dd = new Uint8Array(buffer);
          this.d = "" + dd[1];
          this.updateChart(dd[1]);
          this.checkForCountDown(dd[1]);
        },
        err =>{
          console.log("ERROR FROM STARTNOTIFICATION " + err);
        }
        );
    }

    stop(){
      this.ble.stopNotification(this.device.peripheralId, this.device.service, this.device.measurement)
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
            this.countDown(5);
            this.isCountDown = true;
            console.log("isCountDown!");
          }
        }else{
          this.wi = "0%";
          this.isCountDown = false;
          console.log("is not CountDown");
          clearInterval(this.interval);
        }
      }

      countDown(sec){
        let milli = 0;
        let percent = 0;
        this.interval = setInterval(()=>{
          milli += 25;
          percent = (milli / (sec * 1000)) * 100; 
          console.log("percent " + percent);
          this.wi = percent + "%";
          if(milli == (sec * 1000)){
            console.log("success");
            this.treatInfo.NoTimeinSet++;
            clearInterval(this.interval);
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
              let current = data.current;
              console.log("current", current);
            }
            )
        }
        getThesholdData(){
          this.patientService.login().subscribe(
            data=>{
              let th = data.configurations.configuration;
              console.log("theshold", th);
            }
            )
        }
      }
