import { Component } from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
//import {FirebaseDetail} from '../firebase-detail/firebase-detail'
import { FirebaseListObservable,
    FirebaseObjectObservable,
    AngularFireDatabase
} from 'angularfire2/database';
import firebase from 'firebase';

/**
 * Generated class for the ServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-services',
  templateUrl: 'services.html',
})
export class ServicesPage {    items:FirebaseListObservable<any[]>;
    item:FirebaseObjectObservable<any>;
    contrib_detail: FirebaseListObservable <any[]>;
    currency:any;
    amount:any;
    timestamp: any;


    constructor(db:AngularFireDatabase, public nav:NavController, private alertCtrl:AlertController) {
        this.contrib_detail = db.list('/contrib_detail', {
            query: {
                orderByChild: 'score'
            }
        })

        this.timestamp = firebase.database.ServerValue.TIMESTAMP;
        //       console.log(this.items)
    }

    bluewallet(currency, dateStarts, timeStarts, timeEnds ) {



        let prompt = this.alertCtrl.create({
            title: 'Are you sure you want to proceed',
            message: "You are about to donate "+currency+" services from "+ dateStarts + " to "+ timeEnds +" to the buy a brick Campaign using your blue wallet",
                        buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Confirm',
                    handler: data => {
                        console.log('Saved clicked');
                        window.localStorage.setItem('amiProfilename', data.displayname);
                        this.contrib_detail.push({ contribution: "Services", contribution_name: currency, timestamp: this.timestamp, dateStarts: dateStarts, timeEnds:timeEnds })
                    }
                }
            ]
        });
        prompt.present();

    }

}
