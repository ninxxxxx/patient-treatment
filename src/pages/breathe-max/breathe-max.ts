import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { BLE } from 'ionic-native';
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

    d: string;
    data: any;
    device: any;
    ddd: number;
    fff: number;
    isStart: boolean;
    isConnect: boolean;
    constructor(public navCtrl: NavController, public navParams: NavParams) {
      this.isStart = false;
      this.isConnect = false;
      this.ddd = 0;
      this.fff = 0;
      this.data = [];
      this.device = this.navParams.get('device');
      this.ff();  
    }

    ionViewDidLoad() {
      console.log('ionViewDidLoad BreatheMaxPage');
    }



    

    ff(){
      let i = setInterval(()=>{

        if(this.fff != 10)
          this.fff += 1;
      }, 50);
    }



    gg(){
      this.isStart = true;
      BLE.startNotification(this.device.peripheralId, this.device.service, this.device.measurement).subscribe(
        buffer =>{
          let dd = new Uint8Array(buffer);
          // this.ddd += 1;
          this.data.push(dd[1])
          this.d = "" + dd[1];
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
        }).catch(
        err =>{
          console.error(err);
        }
        )
      }

      setD(data){
        this.d = data;
      }
    }
