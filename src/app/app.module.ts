import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CardIO } from '@ionic-native/card-io';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { FundmePage } from '../pages/fundme/fundme';
import { RedeemPage } from '../pages/redeem/redeem';
import { ShopPage } from '../pages/shop/shop';
import { TabsPage } from '../pages/tabs/tabs';

import { MaterialPage} from '../pages/material/material';
import { ServicesPage} from '../pages/services/services';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import { ChartModule } from 'angular2-highcharts';
//import * as highcharts from 'Highcharts';
import { FirebaseProvider } from '../providers/firebase/firebase';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule}from 'angularfire2';
import{AngularFireAuthModule} from 'angularfire2/auth';

import { MonetaryPage} from '../pages/monetary/monetary';
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyASvO9CFmFVlQdZahOCAsmectq0ygO8NXU",
    authDomain: "housecoders-d9cf8.firebaseapp.com",
    databaseURL: "https://housecoders-d9cf8.firebaseio.com",
    projectId: "housecoders-d9cf8",
    storageBucket: "housecoders-d9cf8.appspot.com",
    messagingSenderId: "1035526976218"
  };
  
@NgModule({
  declarations: [
    MyApp,
    HomePage,FundmePage,RedeemPage,ShopPage,TabsPage,MonetaryPage,MaterialPage,ServicesPage
  ],
  imports: [
    BrowserModule,AngularFireModule.initializeApp(config),AngularFireDatabaseModule,AngularFireAuthModule,
    IonicModule.forRoot(MyApp)//,ChartModule.forRoot(highcharts)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,FundmePage,RedeemPage,ShopPage,TabsPage,MonetaryPage,MaterialPage,ServicesPage
  ],
  providers: [
    StatusBar,
    CardIO,
    BarcodeScanner,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    FirebaseProvider,
    FirebaseProvider
  ]
})
export class AppModule {}
