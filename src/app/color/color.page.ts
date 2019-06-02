import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
@Component({
  selector: 'app-color',
  templateUrl: './color.page.html',
  styleUrls: ['./color.page.scss'],
})
export class ColorPage implements OnInit {
  data:any;
  refreshIntervalId;
  check;
  constructor(private  router : Router, private route : ActivatedRoute, public navCtrl: NavController,private statusBar: StatusBar) { 
    // this.statusBar.hide();
    this.route.queryParams.subscribe(params=>{

      if(params.color=='random'){
        this.refreshIntervalId = setInterval(() => { 
          this.random(); // Now the "this" still references the component
 
       }, 1000);
       
      }else{
        this.data = params.color;
        console.log(this.data);
      }
  
    });
  }

  ngOnInit() {
  }
  async ColorScreen(){
    this.router.navigate(['/color-screen']);
    clearInterval(this.refreshIntervalId);
  }
  async delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms));
  }
  async random(){
    var min=0; 
    var max=255; 
    var ranR = Math.floor(Math.random() * (+max - +min)) + +min;
    var ranG = Math.floor(Math.random() * (+max - +min)) + +min;
    var ranB = Math.floor(Math.random() * (+max - +min)) + +min;

    this.data ='rgb'+'('+""+ranR+""+","+ranG+""+","+ranB+""+')';
    console.log(this.data);
  }
}
