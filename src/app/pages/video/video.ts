import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { IonContent } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable,of, from } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class VideoPage {
  apiKey : string = 'AIzaSyBI-I4jOgMCSmt6xBSpeS2uG5nm1Lc6b0Q';
  videos : any = [];
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('search') search: string = 'Gym Song';
  constructor(
        public http: HttpClient,
        public alertController: AlertController
        ) { }
  

  getVideosForSearch(searchKey, maxResults): Observable<Object> {
    let url = 'https://www.googleapis.com/youtube/v3/search?key=' + this.apiKey + '&q=' + searchKey + '&order=date&part=snippet';
    return this.http.get(url)
      .pipe(map((res) => {
        return res;
      }))
  }

  ionViewWillEnter() {
    this.videos = [];
    this.getVideosForSearch('Gym Song', 5)
      .pipe()
        .subscribe(res => {
          for (let element of res["items"]) {
            this.videos.push(element)
          }
        },err => {
        // Do stuff whith your error
          console.log(err["error"]);
          this.presentAlert();
        });
  }

  scrollToTop(){
    this.content.scrollToTop(1500);
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Some Problem',
      message: 'Under Contructions.',
      buttons: ['OK']
    });

    await alert.present();
  }

  onSearchBarClear(ev){
    console.log('onSearchBarClear()..');
  }

  getItems(ev) {
    // set val to the value of the ev target
    let val = ev.target.value;
    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      
    }
  }
}