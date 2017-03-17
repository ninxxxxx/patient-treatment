import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BLE } from 'ionic-native';
// import { Chart, ChartComponent } from 'ng2-chartjs2';
import { BaseChartDirective } from 'ng2-charts/ng2-charts';

/*
  Generated class for the BreatheMax page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
  */
  @Component({
  	selector: 'page-breathe-max',
  	templateUrl: 'breathe-max.html'
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

    pressure: number;
    
    chartData: any;  
    public doughnutChartLabels:string[] = [];
    public doughnutChartData:number[] = [0, 0, 0, 255];
    public doughnutChartType:string = 'doughnut';

    public chartClicked(e:any):void {
      console.log(e);
    }

    public chartHovered(e:any):void {
      console.log(e);
    }

    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.evrg = 0;
      this.isStart = false;
      this.isConnect = false;
      this.ddd = 0;
      this.fff = 0;
      this.data = [];
      this.device = this.navParams.get('device');
      this.ff();  

      this.pressure = 0;
      this.chartData = [
      {
        label: '# of Votes',
        data: [10, 12, 15, 100],
        backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',

        ],
      }
      ];
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad BreatheMaxPage');
    }



    

    ff(){
      let i = setInterval(()=>{

        if(this.fff != 10)
          this.fff += 1;
      }, 10);
    }



    gg(){
      this.isStart = true;
      BLE.startNotification(this.device.peripheralId, this.device.service, this.device.measurement).subscribe(
        buffer =>{
          let dd = new Uint8Array(buffer);
          // this.ddd += 1;
          // this.data.push(dd[1])

          this.d = "" + dd[1];
          this.updateChart(dd[1]);
          // console.log(dd[1]);
        },
        err =>{
          console.log("ERROR FROM STARTNOTIFICATION " + err);
        }
        );
    }

    stop(){
      BLE.stopNotification(this.device.peripheralId, this.device.service, this.device.measurement)
      .then(
        data=>{
          this.isStart = false;
          console.log(data);
          this.updateChart(0);
        }).catch(
        err =>{
          console.error(err);
        }
        )
      }

      setD(data){
        this.d = data;
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



    }
