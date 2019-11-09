import { Component } from '@angular/core';
import { NavController, Platform, LoadingController } from '@ionic/angular';
import * as SpotifyWebApi from 'spotify-web-api-js';
import { Storage } from '@ionic/storage';
 
declare var cordova: any;

@Component({
  selector: 'music',
  templateUrl: './music.page.html',
  styleUrls: ['./music.page.scss'],
})
export class MusicPage {

  result = {};
  data = '';
  playlists = [];
  spotifyApi: any;
  loggedIn = false;
 
  constructor(public navCtrl: NavController, 
    private storage: Storage,
     private plt: Platform, 
     private loadingCtrl: LoadingController
     ) {
      this.spotifyApi = new SpotifyWebApi.default();
 
    this.plt.ready().then(() => {
      this.storage.get('logged_in').then(res => {
        if (res) {
          this.authWithSpotify(true);
        }
      });
    });
  }
 
  authWithSpotify(showLoading = false) {
    const config = {
      clientId: "e23a728b3ded4bc4b275d81f372fd098",
      redirectUrl: "abs-web-app://callback",
      scopes: ["playlist-read-private", "user-read-email", "user-read-private"],
      tokenExchangeUrl: "https://spotifyoauthserver.herokuapp.com/exchange",
      tokenRefreshUrl: "https://spotifyoauthserver.herokuapp.com/refresh",
    };
 
    if (showLoading) {
      this.loadingCtrl.create();
    }
 
    cordova.plugins.spotifyAuth.authorize(config)
      .then(({ accessToken, encryptedRefreshToken, expiresAt }) => {
        if (this.loadingCtrl) {
          this.loadingCtrl.dismiss();
        }
 
        this.result = { access_token: accessToken, expires_in: expiresAt, refresh_token: encryptedRefreshToken };
        this.loggedIn = true;
        this.spotifyApi.setAccessToken(accessToken);
        this.getUserPlaylists();
        this.storage.set('logged_in', true);
      }, err => {
        console.error(err);
        if (this.loadingCtrl) {
          this.loadingCtrl.dismiss();
        }
      });
  }
 
  getUserPlaylists() {
    this.loadingCtrl.create({
      message: "Loading Playlists...",
    });
 
    this.spotifyApi.getUserPlaylists()
      .then(data => {
        if (this.loadingCtrl) {
          this.loadingCtrl.dismiss();
        }
        this.playlists = data.items;
      }, err => {
        console.error(err);
        if (this.loadingCtrl) {
          this.loadingCtrl.dismiss();
        }
      });
  }
 
  openPlaylist(item) {
    //this.navCtrl.pop('music-playlist', { playlist: item });
  }
 
  logout() {
    // Should be a promise but isn't
    cordova.plugins.spotifyAuth.forget();
 
    this.loggedIn = false;
    this.playlists = [];
    this.storage.set('logged_in', false);
  }

}
