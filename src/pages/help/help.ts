import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Help page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-help',
  templateUrl: 'help.html'
})
export class HelpPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public viewCtrl: ViewController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelpPage');
  }

  slides = [
    {
      title: "ยินดีต้อนรับสู่ Patient Treatment",
      description: "<b>Patient Treatment</b> คือ โปรแกรมสำหรับการฝึกกายภาพ เพื่อช่วยให้ผู้ฝึกสามารถที่จะฝึกกายภาพด้วยตนเองได้",
      image: "assets/img/LOGO.png",
    },
    {
      title: "ขั้นที่ 1",
      description: "กดปุ่ม CONNECT เพื่อทำการเชื่อมต่อกับอุปกรณ์สำหรับการบำบัด",
      image: "assets/img/ConnectDevice.png",
    },
    {
      title: "ขั้นที่ 2",
      description: "รอสักครู่ เพื่อค้นหาอุปกรณ์สำหรับการบำบัด",
      image: "assets/img/Scan.png",
    },
    {
      title: "ขั้นที่ 3",
      description: "ใส่รหัสบลูทูธ เพื่อเข้าใช้งานอุปกรณ์สำหรับการบำบัด",
      image: "assets/img/BluetoothPair.png",
    },
    {
      title: "ขั้นที่ 4",
      description: "กดปุ่ม NEXT เพื่อสู่การบำบัด",
      image: "assets/img/Connected.png",
    }
  ];

  dismiss(){
   this.viewCtrl.dismiss();
  }
  skip(){	
  	this.dismiss();
  	this.setIDtoStorage();
  }

  setIDtoStorage(){
  	this.storage.ready().then(() => {
	    this.storage.set('ShowHelp', "true");
	});
  }

}
