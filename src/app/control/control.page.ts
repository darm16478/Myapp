import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
// import { Firebase } from '@ionic-native/firebase/ngx';
import * as enums from '../../enums/enums';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';
import * as firebase from 'firebase';
import {snapshotToArray} from '../../environments/environment';
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
  inputText:string ='';
  ref= firebase.database().ref('items/');
  constructor(private router :Router,private http: HTTP,public https: HttpClient,public httpd: Http) { 
   this.ref.on('value',resp=>{
    this.items=snapshotToArray(resp);
    this.control=snapshotToArray(resp);
    this.control=this.control[0].name;
    console.log(this.control);
  });
  
  }

  ngOnInit() {
    this.loadControl();
  }
  backHome(){
    this.router.navigate(['/home']);
  }

  loadControl(){
    // let url = this.ipAddress +'/H-lab/control.php';
    // this.httpd.get(url).subscribe(
    //   data => {
    //     this.posts = data.data;
    //     console.log(this.posts);
    //   }
    //   , (error) => { console.log(error); 
    //   }

    // );
//     this.firebase.getToken()
//   .then(token => console.log(`The token is ${token}`)) // save the token server-side and use it to push notifications to this device
//   .catch(error => console.error('Error getting token', error));

// this.firebase.onNotificationOpen()
//    .subscribe(data => console.log(`User opened a notification ${data}`));

// this.firebase.onTokenRefresh()
//   .subscribe((token: string) => console.log(`Got a new token ${token}`));
  
  }
  addItem(item){
    let newItem=this.ref.push();
    newItem.set(item);
    this.inputText = '';
  }
}
