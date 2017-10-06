import { Component } from '@angular/core';

//import { AboutPage } from '../about/about';
//import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { FundmePage } from '../fundme/fundme';
import { RedeemPage } from '../redeem/redeem';
import { ShopPage } from '../shop/shop';



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
    constructor() {
    }

}
