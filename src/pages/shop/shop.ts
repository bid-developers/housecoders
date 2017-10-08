import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CardIO } from '@ionic-native/card-io';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import {FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase} from 'angularfire2/database';
import {LoadingController} from 'ionic-angular';
import 'rxjs/add/operator/map';
import firebase from 'firebase';

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  items : FirebaseListObservable < any[] >;
  item : FirebaseObjectObservable < any >;
  contrib_detail : FirebaseListObservable < any[] >;
  currency : any;
  amount : any;
  timestamp : any;

  scanCodeData: {};
  options: BarcodeScannerOptions;

  constructor(
    public loadingCtrl : LoadingController,
             db : AngularFireDatabase,
             public navCtrl: NavController,
             public navParams: NavParams,
             private cardIO:CardIO,
             private barcodeScanner: BarcodeScanner,
             public alertCtrl: AlertController
            ) {

              this.contrib_detail = db.list('/contrib_detail', {
                query: {
                    orderByChild: 'score'
                }
            })
    
            this.timestamp = firebase.database.ServerValue.TIMESTAMP;
            //       console.log(this.items)


  }


  bluewallet(currency, amount) {
    
            let prompt = this
                .alertCtrl
                .create({
                    title: 'Are you sure you want to proceed',
                    message: "You are about to pay " + currency + " " + amount + " to the buy a brick Campaign using your blue wallet",
                    inputs: [
                        {
                            name: 'displayname',
                            placeholder: 'Enter Blue Wallet PIN'
                        }
    
                    ],
                    buttons: [
                        {
                            text: 'Cancel',
                            handler: data => {
                                console.log('Cancel clicked');
                            }
                        }, {
                            text: 'Confirm',
                            handler: data => {
                                console.log('Saved clicked');
                                window
                                    .localStorage
                                    .setItem('amiProfilename', data.displayname);
                                this
                                    .contrib_detail
                                    .push({contribution: "Monetary", contribution_name: currency, timestamp: this.timestamp, measure: amount})
                                this.presentLoading();
                            }
                        }
                    ]
                });
            prompt.present();
    
        }

  Qrscan(){
    this.options = {
      prompt : "Place a barcode inside the scan area",
      showFlipCameraButton : true,
      showTorchButton : true
  }
  this.barcodeScanner.scan(this.options).then((barcodeData) => {

      //console.log(barcodeData);
      this.scanCodeData = barcodeData;
  }, (err) => {
      console.log("Error occured : " + err);
  });         
}  

scan(){
  this.cardIO.canScan().then(
    (res: boolean) => {
      if(res){
        let options = {
          requireCardholderName: true,
          requireExpiry: true,
          requireCVV: true,
          requirePostalCode: false,
          scanInstructions: "Scan the front of your card",
          scanExpiry: true,
          scanCardHolderName: true,
          guideColor: '#12be76',
          hideCardIOLogo: false,
          suppressConfirmation: false
        };
        this.cardIO.scan(options).then((res:any)=>{
         this.showAlert(res['cardNumber']);
        });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShopPage');
  }



  showAlert(text:string) {
    let alert = this.alertCtrl.create({
      title: 'Payment Success',
      subTitle: 'Thank you for your contribution to the buy a brick campaign, it will go a long w' +
              'ay to building a house for someone who really needs it!',
      buttons: ['OK']
    });
    alert.present();
  }

  success() {
    
            let alert = this
                .alertCtrl
                .create({
                    title: 'Payment Success',
                    subTitle: 'Thank you for your contribution to the buy a brick campaign, it will go a long w' +
                            'ay to building a house for someone who really needs it!',
                    buttons: ['OK']
                });
    
            alert.present();
        }

  presentLoading() {
    let loader = this
        .loadingCtrl
        .create({content: "Payment in progress, please wait...", duration: 1500});
    this.success();

    loader.present();

}

}
