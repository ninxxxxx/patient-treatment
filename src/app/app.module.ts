import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { Storage } from '@ionic/storage';
// import { ChartsModule } from 'ng2-chartjs2';
import { ChartsModule } from 'ng2-charts';

import '../../node_modules/chart.js/src/chart.js';
// import '../../node_modules/ng2-chartjs2/components/chart.js';

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
  IonicModule.forRoot(MyApp),
  ChartsModule,
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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage]
})
export class AppModule {}
