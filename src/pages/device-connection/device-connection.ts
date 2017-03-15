import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the DeviceConnection page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-device-connection',
  templateUrl: 'device-connection.html'
})
export class DeviceConnectionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DeviceConnectionPage');
    this.getIDformStorage();   
  }

  removeIDStorage(){
    this.storage.ready().then(() => {
      this.storage.remove('PatientID');
      this.storage.remove('ThresholdID');
      this.storage.remove('StaffID');
      this.storage.remove('DeviceID');
      this.storage.remove('WeekNO');
      this.storage.remove('ThresholdDateTime');
      this.storage.remove('Threshold1');
      this.storage.remove('Threshold2');
      this.storage.remove('Threshold3');
      this.storage.remove('Threshold4');
      this.storage.remove('Threshold5');
      this.storage.remove('Threshold6');
      this.storage.remove('Threshold7');
      this.storage.remove('Threshold8');
      this.storage.remove('Threshold9');
      this.storage.remove('Threshold10');
      this.storage.remove('NoDayinWeek');
      this.storage.remove('NoSetinDay');
      this.storage.remove('NoTimeinSet');
    });

    this.getIDformStorage();
  }

  getIDformStorage(){
    this.storage.ready().then(() => {
      this.storage.get('PatientID').then((value) => {
          console.log('PatientID: ', value);
      })
    });

    this.storage.ready().then(() => {
      this.storage.get('ThresholdID').then((value) => {
          console.log('ThresholdID: ', value);
      })
    });

    this.storage.ready().then(() => {
      this.storage.get('StaffID').then((value) => {
          console.log('StaffID: ', value);
      })
   });
   
    this.storage.ready().then(() => {
      this.storage.get('DeviceID').then((value) => {
          console.log('DeviceID: ', value);
      })
   });

    this.storage.ready().then(() => {
      this.storage.get('WeekNO').then((value) => {
          console.log('WeekNO: ', value);
      })
   });

    this.storage.ready().then(() => {
      this.storage.get('Threshold1').then((value) => {
          console.log('Threshold1: ', value);
      })
   });

    this.storage.ready().then(() => {
      this.storage.get('Threshold2').then((value) => {
          console.log('Threshold2: ', value);
      })
   });

    this.storage.ready().then(() => {
      this.storage.get('Threshold3').then((value) => {
          console.log('Threshold3: ', value);
      })
   });

    this.storage.ready().then(() => {
      this.storage.get('Threshold4').then((value) => {
          console.log('Threshold4: ', value);
      })
   });

    this.storage.ready().then(() => {
      this.storage.get('Threshold5').then((value) => {
          console.log('Threshold5: ', value);
      })
   });

    this.storage.ready().then(() => {
      this.storage.get('Threshold5').then((value) => {
          console.log('Threshold5: ', value);
      })
   });

    this.storage.ready().then(() => {
      this.storage.get('Threshold6').then((value) => {
          console.log('Threshold6: ', value);
      })
   });

    this.storage.ready().then(() => {
      this.storage.get('Threshold7').then((value) => {
          console.log('Threshold7: ', value);
      })
   });

    this.storage.ready().then(() => {
      this.storage.get('Threshold8').then((value) => {
          console.log('Threshold8: ', value);
      })
   });

    this.storage.ready().then(() => {
      this.storage.get('Threshold9').then((value) => {
          console.log('Threshold9: ', value);
      })
   });

    this.storage.ready().then(() => {
      this.storage.get('Threshold10').then((value) => {
          console.log('Threshold10: ', value);
      }) 
   });

    this.storage.ready().then(() => {
      this.storage.get('NoDayinWeek').then((value) => {
          console.log('NoDayinWeek: ', value);
      })
   });

    this.storage.ready().then(() => {
      this.storage.get('NoSetinDay').then((value) => {
          console.log('NoSetinDay: ', value);
      })   
   });

    this.storage.ready().then(() => {
      this.storage.get('NoTimeinSet').then((value) => {
          console.log('NoTimeinSet: ', value);
      })       
   });
  }
}
