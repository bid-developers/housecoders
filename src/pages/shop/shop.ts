import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CardIO } from '@ionic-native/card-io';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-shop',
  templateUrl: 'shop.html',
})
export class ShopPage {

  scanCodeData: {};
  options: BarcodeScannerOptions;

  constructor(public navCtrl: NavController,
             public navParams: NavParams,
             private cardIO:CardIO,
             private barcodeScanner: BarcodeScanner,
             public alertCtrl: AlertController
            ) {
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
          requireCCV: true,
          requirePostalCode: false,
          scanInstructions: "Scan the front of your card",
          scanExpiry: true,
          scanCardHolderName: true,
          guideColor: '#12be76',
          hideCardIOLogo: true
        };
        this.cardIO.scan(options).then((data)=>{
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
      title: 'alert',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present();
  }
}
