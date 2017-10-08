import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { MonetaryPage} from '../monetary/monetary';
import { MaterialPage} from '../material/material';
import { ServicesPage} from '../services/services';
/**
 * Generated class for the FundmePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-fundme',
  templateUrl: 'fundme.html',
})
export class FundmePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FundmePage');
  }

    monetary(){
        this.navCtrl.push(MonetaryPage);
    }

    material(){
        this.navCtrl.push(MaterialPage);
    }

    services(){
        this.navCtrl.push(ServicesPage);
    }

}
