import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LoginPage } from '../pages/login/login';
import { DeviceConnectionPage } from '../pages/device-connection/device-connection';
import { BreatheMaxPage } from '../pages/breathe-max/breathe-max';
@NgModule({
  declarations: [
  MyApp,
  LoginPage,
  DeviceConnectionPage,
  BreatheMaxPage,

  ],
  imports: [
  IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
  MyApp,
  LoginPage,
  DeviceConnectionPage,
  BreatheMaxPage,

  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
