import { Flashlight } from '@ionic-native/flashlight/ngx';
import { FlashLightPageModule } from './flash-light/flash-light.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomePageModule } from './home/home.module';
import { HTTP } from '@ionic-native/http/ngx';
import {HttpClientModule} from '@angular/common/http';
import { HttpModule } from '@angular/http'; 
import {FIREBASE_CONFIG} from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule,FirestoreSettingsToken } from 'angularfire2/firestore';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, HttpClientModule,HttpModule,
  
    IonicModule.forRoot(), 
    AppRoutingModule, 
    FlashLightPageModule,
    HomePageModule,
    AngularFirestoreModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Flashlight,
    HTTP,HttpClientModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide : FirestoreSettingsToken, useValue: {}}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
