
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Flashlight } from '@ionic-native/flashlight/ngx';
@Component({
  selector: 'app-flash-light',
  templateUrl: './flash-light.page.html',
  styleUrls: ['./flash-light.page.scss'],
})
export class FlashLightPage implements OnInit {
checkNormal=0;
checkBlink=0;
check=true;
type:String;
  constructor(public navCtrl: NavController,private router: Router,private route : ActivatedRoute,private flashlight: Flashlight) { 
    this.check=true;  
  }

  ngOnInit() {
  }
  backHome(){
    this.router.navigate(['/home']);

  }

  
  //_______________________________________________________________________________________________

  //------------------------------------- Flash Light --------------------------------------------
  //________________________________________________________________________________________________
  async flashLight(event){
     this.type = event.target.id;
    if(this.type=="normal"){
      this.check=false;
      this.checkNormal++;
      if(this.checkNormal%2==0){
        this.flashlight.switchOff();
      }else {
        this.check=false;
        this.flashlight.switchOn();
      }
   }
    else if(this.type=="blink"){
      this.checkBlink++;
      this.check=true;
      this.flashlight.switchOff();
      while(this.checkBlink%2!=0 || this.type!="blink"){
        this.type = event.target.id;
        this.flashlight.switchOn();
        await this.delay(500);
        this.flashlight.switchOff();
        await this.delay(500);
        if(this.type=="normal"){
          break;
        }
      }

    }
  }

//________________________________________________________________________________________________

//------------------------------------- Funcetion Delay ------------------------------------------
//________________________________________________________________________________________________
  async delay(ms) {
    return await new Promise(resolve => setTimeout(resolve, ms));
  }

}
