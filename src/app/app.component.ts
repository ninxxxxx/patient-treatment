import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Storage } from '@ionic/storage';

import { LoginPage } from '../pages/login/login';
import { DeviceConnectionPage } from '../pages/device-connection/device-connection'; 
import { BreatheMaxPage } from '../pages/breathe-max/breathe-max';
import { HelpPage } from '../pages/help/help';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage;

  constructor(platform: Platform, 
    public storage: Storage) {

    this.getIDformStorage();

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  getIDformStorage(){
    this.storage.ready().then(() => {
      this.storage.get('PatientID').then((id) => {
        console.log('CheckPatientIDStorage:', id);

        //this.rootPage = HelpPage;

        if(id != null){
          this.rootPage = DeviceConnectionPage;
        }else{
          this.rootPage = LoginPage;
        }
      })
    });
  }
}
