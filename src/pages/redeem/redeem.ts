import { Component } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { FirebaseListObservable,
    FirebaseObjectObservable,
    AngularFireDatabase
} from 'angularfire2/database';
import {LoadingController} from 'ionic-angular';
import firebase from 'firebase';
//import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the RedeemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-redeem',
  templateUrl: 'redeem.html',
})
export class RedeemPage {
    items:FirebaseListObservable<any[]>;
    item:FirebaseObjectObservable<any>;
    contrib_detail: FirebaseListObservable <any[]>;
    currency:any;
    amount:any;
    timestamp: any;

  constructor(db:AngularFireDatabase, public nav : NavController, private alertCtrl : AlertController, public loadingCtrl : LoadingController, public navParams: NavParams) {
      this.items = db.list('/adverts', {
          query: {
              orderByChild: 'score'
          }
      })


      this.contrib_detail = db.list('/redemption', {
          query: {
              orderByChild: 'score'
          }
      })

      this.timestamp = firebase.database.ServerValue.TIMESTAMP;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RedeemPage');
  }

    bluewallet( amount) {

        let prompt = this
            .alertCtrl
            .create({
                title: 'Are you sure you want to proceed',
                message: "You are about to redeem code: " + amount + " to get your 'buy a brick' Campaign points",
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
                            this.contrib_detail.push({timestamp: this.timestamp, measure: amount})
                            this.presentLoading();
                        }
                    }
                ]
            });
        prompt.present();

    }

    presentLoading() {
        let loader = this
            .loadingCtrl
            .create({content: "Payment in progress, please wait...", duration: 1500});
        this.success();

        loader.present();

    }



    success() {

        let alert = this
            .alertCtrl
            .create({
                title: 'Redemption Success',
                subTitle: 'Thank you for your contribution to the buy a brick campaign, it will go a long w' +
                    'ay to building a house for someone who really needs it!',
                buttons: ['OK']
            });

        alert.present();
    }
}
