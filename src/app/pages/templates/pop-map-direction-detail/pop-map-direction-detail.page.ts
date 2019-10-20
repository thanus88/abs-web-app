import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams } from '@ionic/angular';

@Component({
  selector: 'pop-map-direction-detail',
  templateUrl: './pop-map-direction-detail.page.html',
  styleUrls: ['./pop-map-direction-detail.page.scss'],
})
export class PopMapDirectionDetailPage {

  message = '';
  pop: PopoverController;

  constructor(navParams: NavParams) {
    this.message = navParams.get('message');
    this.pop = navParams.get('popoverController');
  }

  close() {
    this.pop.dismiss();
  }

  ngOnInit() {
  }

}
