import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import { Firebase } from '@ionic-native/firebase/ngx';
import * as enums from '../../enums/enums';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import * as firebase from 'firebase';
import {snapshotToArray} from '../../environments/environment';
import { Flashlight } from '@ionic-native/flashlight/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})
export class ControlPage implements OnInit {
  contact = [];
  ipAddress = enums.APIURL.URL;
  items=[];
  control:any;
  controlcolor:any;
  controlflash:any;
  inputText:string ='';
  ref= firebase.database().ref('items/');
  seats: String;
  str :String;
  flaslight = 0;
  flashControl:number;
  constructor(private router :Router,private http: HTTP,public https: HttpClient,public httpd: Http,private flashlight: Flashlight,
    private alertCtrl: AlertController) { 
    this.apresentPrompt();
    this.ref.on('value',resp=>{
    this.items=snapshotToArray(resp);
    this.control=snapshotToArray(resp);
    const myObjStrColor = JSON.stringify(this.control[0]);
    JSON.parse(myObjStrColor, (key, value) => {
      if (key === this.seats) {
        this.controlcolor=value;
        return value;
      }
      return value;
    });
    const myObjStrFlash = JSON.stringify(this.control[1]);
    JSON.parse(myObjStrFlash, (key, valueflash) => {
      if (key === this.seats) {
        this.flashControl=valueflash;
        this.FlashLight();
        // while(this.testf != 0) {
        //   this.flashlight.switchOn();
        //   await this.delay(1000);
        //   this.flashlight.switchOff();
        //   await this.delay(1000);
        // }
        return valueflash;
      }
      return valueflash;
    });
  });
  
  }

  ngOnInit() {
    this.loadControl();
  }
  backHome(){
    this.router.navigate(['/home']);
  }
  loadControl(){

  
  }
  async delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms));
  }
  async FlashLight(){
    while(this.flashControl != 0) {
      this.flashlight.switchOn();
      await this.delay(this.flashControl);
      this.flashlight.switchOff();
      await this.delay(this.flashControl);
    }
    this.flashlight.switchOff();
  }
  async apresentPrompt() {
    let alert =  await this.alertCtrl.create({
     header : 'กรุณากรอกหมายเลขที่นั้ง',
      inputs: [
        {
          name: 'seats',
          placeholder: 'หมายเลขที่นั้ง',
          type: 'text'
        }
      ],
      buttons: [
        {
          text: 'ยกเลิก',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'ยืนยัน',
          handler: data => {

            this.seats= data.seats;
            let DatabaseReference = firebase.database().ref('items/Color/'+ data.seats);
            let DatabaseReferenceFlash = firebase.database().ref('items/FlashLight/'+ data.seats);
            DatabaseReference.set(0);
            DatabaseReferenceFlash.set(0);
            this.inputText = '';
          }
        }
      ]
    });

    await alert.present();
    return this.seats;
  }
  // test(){
  
  //    console.log(this.controlcolor);
  //    console.log(this.testf)

  // }
}

