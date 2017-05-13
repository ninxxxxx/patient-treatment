import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
// import { StatusBar, Splashscreen } from '@ionic-native';
import { Storage } from '@ionic/storage';
import X2JS from 'x2js';


import { LoginPage } from '../pages/login/login';
import { DeviceConnectionPage } from '../pages/device-connection/device-connection'; 
import { BreatheMaxPage } from '../pages/breathe-max/breathe-max';
import { PatientDataPage } from '../pages/patient-data/patient-data';
// import { HelpPage } from '../pages/help/help';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage;

  constructor(platform: Platform, 
    public storage: Storage) {
    // this.rootPage = DeviceConnectionPage;
    // this.rootPage = BreatheMaxPage;
    // this.rootPage = DeviceConnectionPage;
    this.getIDformStorage();
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      // StatusBar.styleDefault();
      // Splashscreen.hide();
    });
  }

  getIDformStorage(){
    this.storage.ready().then(() => {
      this.storage.get('PatientID').then((id) => {
        console.log('CheckPatientIDStorage:', id);

        // this.rootPage = PatientDataPage;
        // this.rootPage = LoginPage;

        if(id != null){
          this.rootPage = PatientDataPage;
          // this.rootPage = BreatheMaxPage;
        }else{
          // this.rootPage = BreatheMaxPage;
          this.rootPage = LoginPage;
        }
      })
    });
  }


}
