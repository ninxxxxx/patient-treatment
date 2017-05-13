import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { BrowserModule } from '@angular/platform-browser';
import { ChartsModule } from 'ng2-charts';
import { BLE } from '@ionic-native/ble';
import { TextToSpeech } from '@ionic-native/text-to-speech';

import '../../node_modules/chart.js/src/chart.js';

import { MyApp } from './app.component';




import { LoginPage } from '../pages/login/login';
import { DeviceConnectionPage } from '../pages/device-connection/device-connection';
import { BreatheMaxPage } from '../pages/breathe-max/breathe-max';
import { HelpPage } from '../pages/help/help';
import { PatientDataPage } from '../pages/patient-data/patient-data';

@NgModule({
  declarations: [
  MyApp,
  LoginPage,
  DeviceConnectionPage,
  BreatheMaxPage,
  HelpPage,
  PatientDataPage

  ],
  imports: [
  HttpModule,
  BrowserModule,
  ChartsModule,
  IonicStorageModule.forRoot(MyApp),
  IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  LoginPage,
  DeviceConnectionPage,
  BreatheMaxPage,
  HelpPage,
  PatientDataPage

  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, BLE]
})
export class AppModule {}
