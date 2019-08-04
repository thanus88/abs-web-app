import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserData } from '../../providers/user-data';

import { UserOptions } from '../../interfaces/user-options';
import { Events } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenService } from '../../providers/AuthenService';

declare const FB: any;
declare const googleUser : any;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['./login.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginPage {
  login: any = {
    
  };
  submitted = false;
  HAS_LOGGED_IN = 'hasLoggedIn';
  HAS_SEEN_TUTORIAL = 'hasSeenTutorial';

  constructor(
    public userData: UserData,
    public router: Router,
    public AuthenService:AuthenService,
    public events: Events,
    public storage: Storage
  ) {
    /*
    FB.init({
      appId: '501447963923481',
      cookie: true,
      xfbml: true,  //parse social plugins on this page
      version: 'v4.0' //use graph api version 2.5
    });
    (function (d, s, id, appId) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v4.0&appId=" 
    + appId; //<--passing config value here
      fjs.parentNode.insertBefore(js, fjs);
    } (document, 'script', 'facebook-jssdk', '501447963923481'));
    */
   }

  onLogin(form: NgForm) {
    this.submitted = true;
    console.log('onLogin..');
    if (form.valid) {
      this.AuthenService.login(this.login).subscribe(
          res => {
            const email: string = this.login.email;
            this.userData.login(email);
            this.router.navigateByUrl('/app/tabs/(schedule:schedule)');
          },
          err => { // NOT_FOUND Exception.
              console.error(err);
              this.router.navigateByUrl('/signup');
          }
        );
      }
    }

  onSignup() {  //  Re Direct TO Signup page.
    this.router.navigateByUrl('/signup');
  }

  onSignInByGoogle(){
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }

  onLoginByFacebook(form: NgForm) {
    this.submitted = false;
    console.log('onLoginByFacebook..');
    //this.checkLoginState();
    this.router.navigateByUrl('/signup');
  }

  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      this.router.navigateByUrl('/app/tabs/(rss-feed:rss-feed)');
    } else {
      // The person is not logged into your app or we are unable to tell.
      this.router.navigateByUrl('/signup');
    }
  }

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      console.log(response);
      this.statusChangeCallback(response);
    });
  }
}
