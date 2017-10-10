import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
//import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FundmePage } from '../fundme/fundme';
import { RedeemPage } from '../redeem/redeem';
import { ShopPage } from '../shop/shop';
import { LoginPage } from '../login/login';


@Component({
    selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
//@ViewChild(Navbar) navBar: Navbar;
  tab1Root = HomePage;
  tab2Root = FundmePage;
  tab3Root = RedeemPage;
  tab4Root = ShopPage;
    constructor( public navCtrl:NavController,private alert: AlertController,public platform: Platform) {

        if (!this.isLoggedin()) {
            //          console.log('You are not logged in');
            this.onNotification();
            this.navCtrl.push(LoginPage);
        }
    }

    async onNotification() {
    try {
        await this.platform.ready();

        FCMPlugin.onNotification((data) => {
            this.alert.create({
                message: data.message
            }).present();
        }, (error) => console.error(error));
    }
    catch(e) {
        console.error(e);
    }
}

    isLoggedin() {
        if (window.localStorage.getItem('currentemail') == 'guest') {
            console.log('You are logged in as ' + window.localStorage.getItem('currentuser'));
            //   console.log(JSON.parse(window.localStorage.getItem('currentemail')));
            //window.sessionStorage
//            console.log(window.localStorage.getItem('currentuser'));
            //          window.localStorage.clear();
            //this.navCtrl.push(MenuPage);
            // console.log('guest block executed');
            return true;
        } else {

            if (window.localStorage.getItem('currentemail') == null) {
                //               this.navCtrl.push(LoginPage);
                //    console.log('null block executed');
                //this.navCtrl.push(TabsPage);
                return false
            } else
            //return true;
            //    console.log('authorized user block');
                return true
                //this.navCtrl.push(TabsPage);
        }
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad FundmePage');
    }

}
