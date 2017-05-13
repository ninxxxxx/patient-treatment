import { Component } from '@angular/core';
import { ModalController, NavController, NavParams, ToastController } from 'ionic-angular';
import { BLE } from '@ionic-native/ble';
import { Storage } from '@ionic/storage';
import { BaseChartDirective, ChartsModule} from 'ng2-charts';


import { BreatheMaxPage } from '../../pages/breathe-max/breathe-max';
import { PatientService } from '../../providers/patient-service';
import { HelpPage } from '../help/help';
import { PatientDataPage } from '../../pages/patient-data/patient-data';


// import { DoughnutChartComponent } from '../../components/doughnut-chart/doughnut-chart';
/*
Generated class for the DeviceConnection page.

See http://ionicframework.com/docs/v2/components/#navigation for more info on
Ionic pages and navigation.
*/
@Component({
  selector: 'page-device-connection',
  templateUrl: 'device-connection.html',
  providers: [PatientService],

})
export class DeviceConnectionPage {
  deviceCode: any;


  defaultDevice: any;
  devices: any;
  userInfo: any;
  isConnect: boolean;
  interval: any;
  info: any;
  status: string;
  datas: any;

  chartType:string;
  constructor(
    private ble: BLE,
    public storage: Storage, 
    private patientService: PatientService, 
    public toastCtrl: ToastController, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController
    ) 
  {
    this.datas = [];
    this.status = "connect your device...";
    this.defaultDevice = {
      service: '180D',
      measurement: '2A37',
      peripheralId: ''
    };
    this.isConnect = false;
    this.userInfo = {deviceId:7};
    this.devices = [{name: "ATMEL-HRP", id:"F8:F0:05:F5:1B:DA", deviceId:7}]; 

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceConnectionPage');
  }

  ionViewWillUnload(){
    if(this.isConnected()){
      this.ble.disconnect(this.defaultDevice.peripheralId)
      .then(()=>console.log("Peripheral is Disconnected"))
      .catch(err => console.error(err));
    }
  }

  isConnected(){
    this.ble.isConnected(this.defaultDevice.peripheralId)
    .then(()=>{
      this.isConnect = true;
      this.status = "Connected";

    })
    .catch(err =>{
      this.isConnect = false
      this.status = "Can't connect";

    });
  }

  scan(){
    // this.isConnect = true;
    this.status = "Scanning...";
    this.ble.scan([this.defaultDevice.service], 5).subscribe(
      device =>{
        this.ble.connect(device.id).subscribe(
          peripheral=>{
            this.ble.isConnected(peripheral.id)
            .then(()=>{
              this.isConnect = true;
              this.status = "Connected";
              this.defaultDevice.peripheralId = peripheral.id;
            })
            .catch(err =>{
              this.isConnect = false
              this.status = "Can't connect";

            });
            // this.status = "Connected to " + peripheral.id;
          }
          )
      },
      err =>{
        console.log("err" + err);
      }
      )
  }

  next(){
    this.navCtrl.push(BreatheMaxPage, {device: this.defaultDevice});
  }


  toast(msgs: string, ms: number){
    let t = this.toastCtrl.create({message: msgs, duration: ms})
    t.present();
  }

  disconnect(){
    this.ble.disconnect(this.defaultDevice.peripheralId)
    .then(data=>{
      this.isConnect = false;
      this.toast("Disconnected", 3000);
    })
    .catch(err=>{
      this.toast(""+err, 3000);
    })
  }

  openPatientDataModal(){
    let modal = this.modalCtrl.create(PatientDataPage);
    modal.present();
  }

  testTheshold(){
    this.patientService.login("58333333").subscribe(
      data=>{console.log("data", data)},
      error=>{console.log("error", error)}
      );
  }
  testCurrent(){
    this.patientService.login("58333333").subscribe(
      data=>{console.log("data", data)},
      error=>{console.log("error", error)}
      );
  }



}
