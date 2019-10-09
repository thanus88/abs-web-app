import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Events, MenuController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import { UserData } from './providers/user-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  appPages = [
    {
      title: 'Channal',
      url: '/app/tabs/choice',
      icon: 'md-easel'
    },
    {
      title: 'News',
      url: '/app/tabs/rss-feed',
      icon: 'logo-rss'
    },
     /*
    {
      title: 'Speakers',
      url: '/app/tabs/(speakers:speakers)',
      icon: 'contacts'
    },
    */
    {
      title: 'Map',
      url: '/app/tabs/map',
      icon: 'map'
    },
    
    {
      title: 'About',
      url: '/app/tabs/about',
      icon: 'information-circle'
    }
  ];
  loggedIn = false;

  constructor(
    private events: Events,
    private menu: MenuController,
    private platform: Platform,
    private router: Router,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storage: Storage,
    private userData: UserData
  ) {
    this.initializeApp();
  }

  ngOnInit() {
    this.checkLoginStatus();
    this.listenForLoginEvents();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  checkLoginStatus() {
    return this.userData.isLoggedIn().then(loggedIn => {
      return this.updateLoggedInStatus(loggedIn);
    });
  }

  updateLoggedInStatus(loggedIn: boolean) {
    setTimeout(() => {
      this.loggedIn = loggedIn;
    }, 300);
  }

  listenForLoginEvents() {
    this.events.subscribe('user:login', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:signup', () => {
      this.updateLoggedInStatus(true);
    });

    this.events.subscribe('user:logout', () => {
      this.updateLoggedInStatus(false);
    });
  }

  selectTab(index: number, fallbackUrl: string) {
    const tabs = document.querySelector('ion-tabs');
    let promise: Promise<any> = null;
    if (tabs) {
      //promise = tabs.componentOnReady();
      promise.then(() => {
        return; //tabs.select(index);
      });
    } else {
      promise = this.navigate(fallbackUrl);
    }
    return promise.then(() => {
      return this.menu.toggle();
    });
  }

  navigate(url: string) {
    return this.router.navigateByUrl(url);
  }

  logout() {
    this.userData.logout().then(() => {
      return this.navigate('/app/tabs/choice');
    });
  }

  openTutorial() {
    this.menu.enable(false);
    this.storage.set('ion_did_tutorial', 'false');
    this.router.navigateByUrl('/tutorial');
  }
}
