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
  constructor(private router :Router,private http: HTTP,public https: HttpClient,public httpd: Http,private flashlight: Flashlight,
    private alertCtrl: AlertController) { 
    this.apresentPrompt();
    this.ref.on('value',resp=>{
    this.items=snapshotToArray(resp);
    this.control=snapshotToArray(resp);
    this.controlcolor=this.control[0].Name;
  
    this.controlflash=this.control[1].Type;
    console.log(this.controlflash);
    if(this.controlflash == 0){
      this.flashlight.switchOff();
    }else if(this.controlflash > 0){ 
        this.FlashLight(this.controlflash);
    }
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
  addItem(item){
    let newItem=this.ref.push();
    newItem.set(item);
    this.inputText = '';
  }
  async delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms));
  }
  async FlashLight(time){
    // do {
    // this.flashlight.switchOn();
    // await this.delay(time);
    // this.flashlight.switchOff();
    // await this.delay(time);
    // }while(time!=0);
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
            let newItem=this.ref.push();
            newItem.set("data.seats");
            this.inputText = '';
          }
        }
      ]
    });
    alert.present();
  }
}
