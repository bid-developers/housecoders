import {Component} from '@angular/core';
import {NavController, AlertController, NavParams} from 'ionic-angular';
import 'rxjs/add/operator/map';
//import {FirebaseDetail} from '../firebase-detail/firebase-detail'
import {FirebaseListObservable, FirebaseObjectObservable, AngularFireDatabase} from 'angularfire2/database';
import firebase from 'firebase';
import {LoadingController} from 'ionic-angular';
import {CardIO} from '@ionic-native/card-io';
/**
 * Generated class for the MonetaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({selector: 'page-monetary', templateUrl: 'monetary.html'})
export class MonetaryPage {
    items : FirebaseListObservable < any[] >;
    item : FirebaseObjectObservable < any >;
    contrib_detail : FirebaseListObservable < any[] >;
    currency : any;
    amount : any;
    timestamp : any;

    constructor(db : AngularFireDatabase, public nav : NavController, private alertCtrl : AlertController, public loadingCtrl : LoadingController, private cardIO : CardIO, public navParams : NavParams) {
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

    scan(currency,amount){
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


        showAlert(text:string) {
            let alert = this.alertCtrl.create({
              title: 'alert',
              subTitle: text,
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