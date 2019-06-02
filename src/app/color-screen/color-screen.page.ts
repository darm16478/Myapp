import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color-screen',
  templateUrl: './color-screen.page.html',
  styleUrls: ['./color-screen.page.scss'],
})
export class ColorScreenPage implements OnInit {
  colors:string;
  value:String;
  constructor(private router: Router) { 
  
  }
  
  ngOnInit() {
  }
  backHome(){
    console.log("go to home")

    this.router.navigate(['/home']);

  }

  getColor(event){
    var color = event.target.id;
    if(color=='random'){
      let colorParametter ={
        queryParams : {
          color : 'random'
        }
      }
      this.router.navigate(['/color'],colorParametter);
    }else{
      let colorParametter ={
        queryParams : {
          color : color
        }
      }
      console.log(colorParametter);
      this.router.navigate(['/color'],colorParametter);
    }
    }
    
}
