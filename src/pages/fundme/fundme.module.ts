import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundmePage } from './fundme';

@NgModule({
  declarations: [
    FundmePage,
  ],
  imports: [
    IonicPageModule.forChild(FundmePage),
  ],
})
export class FundmePageModule {}
