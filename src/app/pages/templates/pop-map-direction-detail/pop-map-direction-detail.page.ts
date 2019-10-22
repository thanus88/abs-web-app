import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'pop-map-direction-detail',
  templateUrl: './pop-map-direction-detail.page.html',
  styleUrls: ['./pop-map-direction-detail.page.scss'],
})
export class PopMapDirectionDetailPage {

  props: any;

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams
    ) {
    this.props = navParams.get('props');
  }

  close() {
    this.modalCtrl.dismiss(this.props);
  }

}
