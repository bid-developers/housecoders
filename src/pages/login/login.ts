import { Component } from '@angular/core';
import { Loading, LoadingController,NavController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import {ResetPasswordPage} from '../reset-password/reset-password';
import {SignupPage} from '../signup/signup';
import {TabsPage} from '../tabs/tabs';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';

//import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm: FormGroup;
  public loading: Loading;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController, 
    public authProvider: AuthProvider, 
    public formBuilder: FormBuilder,public facebook: Facebook) {

      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  loginUser(){
    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authProvider.loginUser(this.loginForm.value.email, this.loginForm.value.password)
      .then( authData => {
        this.navCtrl.setRoot(TabsPage);
              window.localStorage.setItem('currentemail',this.loginForm.value.email );
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    }
  }

  goToResetPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }

  createAccount(){
    this.navCtrl.push(SignupPage);

}
    facebookLogin(): Promise<any> {
        return this.facebook.login(['email'])
            .then( response => {
                const facebookCredential = firebase.auth.FacebookAuthProvider
                    .credential(response.authResponse.accessToken);

                firebase.auth().signInWithCredential(facebookCredential)
                    .then( success => {
                        console.log("Firebase success: " + JSON.stringify(success));
                        this.navCtrl.setRoot(TabsPage);
                    });

            }).catch((error) => { console.log(error) });
    }

}