import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
//import { AuthProvider } from '../../providers/auth/auth';
//import {LoginPage} from '../login/login';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navParams: NavParams) {
  }

  
  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
